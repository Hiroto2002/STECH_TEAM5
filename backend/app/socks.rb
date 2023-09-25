require "rubygems"
require 'bundler/setup'
Bundler.require
require "sinatra/base"
require "thin"
require 'json'
require 'securerandom'
require "cgi/escape"
require 'faye/websocket'
require "./utils/hash.rb"
require "./db.rb"
require "mysql2"

class Socks < DB
    set :server, 'thin'
    set :sockets, {}

    get '/v1/chat' do
        sql = "select * from chathist where ena=1 and del=0;"
        res = execSQL(sql)

        chats = []
        res.each{ |row|
            hash = {}
            hash[:user_id] = row['user_id']
            hash[:user_name] = row['user_name']
            hash[:message] = row['message']
            hash[:created_at] = row['created_at']
            chats.push(hash)
        }

        json chats
    end

    get '/v1/create' do
        # Parameters
        room_capacity = params['capacity'].to_i ||=nil
        room_rawpass  = params['pass']          ||='none'
        room_name     = params['room_name']     ||=nil

        raise BadRequest, "More arguments needed" if room_capacity == nil
        raise BadRequest, "More arguments needed" if room_name == nil

        room_id = "#{SecureRandom.uuid}"
        room_passhash = HashSHA.get256(room_rawpass)
        room_expire = Time.now + (60 * 60 * 24 * 10)

        sql = insertSQL("rooms", "room_id", "room_name", "passhash", "capacity", "expire_at")
        execSQL(sql, room_id, room_name, room_passhash, room_capacity, room_expire)        

        result = {}
        result['token'] = room_id
        result['name'] = CGI.escapeHTML(room_name)
        result['capacity'] = room_capacity
        result['expire'] = room_expire
        
        json result
    end

    get '/v1/connect' do
        # Parameters                  
        uid   = params['uid']   ||=nil
        uname = params['uname'] ||=nil        

        raise BadRequest, "More arguments needed" if uid == nil
        raise BadRequest, "More arguments needed" if uname == nil             

        # Check protocol       
        if Faye::WebSocket.websocket?(request.env)
            ws = Faye::WebSocket.new(request.env)  
            # Strean: Open        
            ws.on :open do |event|
                ip = ws.env['HTTP_X_REAL_IP']
                puts Time.now.to_s + " Open " + ip + ":" + uid + ":" + uname

                data_store = {}                
                data_store[:uid] = uid
                data_store[:uname] = uname
                data_store[:ws] = ws      
                settings.sockets[uid] = data_store
                puts Time.now.to_s + " Connection " + "#{settings.sockets.count}"
            end

            ws.on :message do |event|
                ip = ws.env['HTTP_X_REAL_IP']
                puts Time.now.to_s + " Message " +  ip + ""
            
                # +TODO: Remove SQL Generator
                sql = "select id from chathist where user_id=? and created_at > current_timestamp + interval -30 second;"
                res = execSQLonWS(sql, uid).count                                                                
                
                # +TODO: Refactoring
                settings.sockets.keys.each do |uid|                     
                    data_store = settings.sockets[uid]                   
                    socket_ = data_store[:ws]
                    uname_  = data_store[:uname]
                    uid_    = data_store[:uid]                   
                    send_data = {}
                    begin
                        recv_data = JSON.parse(event.data)                                            
                        if recv_data['type'] == "echo"
                            send_data['type'] = "echo"
                            send_data['from_type'] = "system"
                            send_data['from_uid'] = uid
                            send_data['from_uname'] = uname
                            send_data['body'] = nil
                            
                            if socket_ == ws
                                json_string = JSON.generate(send_data)                        
                                socket_.send(json_string)
                            end
                        elsif recv_data['type'] == "message" and res <= settings.max_30sec_post                           
                            send_data['type'] = "message"
                            send_data['from_type'] = "user"
                            send_data['from_uid'] = uid
                            send_data['from_uname'] = uname
                            send_data['body'] = CGI.escapeHTML(recv_data['body'])  
                            
                            json_string = JSON.generate(send_data)                        
                            socket_.send(json_string)

                            sql = insertSQL("chathist", "user_id", "user_name", "msg", "ip")               
                            result = execSQLonWS(sql, uid, uname, send_data['body'], ip)
                        elsif recv_data['type'] == "message" and res > settings.max_30sec_post  
                            send_data['type'] = "warn"
                            send_data['from_type'] = "system"
                            send_data['from_uid'] = nil
                            send_data['from_uname'] = nil
                            send_data['body'] = "limit"                                                      

                            if socket_ == ws
                                json_string = JSON.generate(send_data)                        
                                socket_.send(json_string)
                            end
                        end

                    rescue JSON::ParserError => e  
                        send_data['type'] = "error"
                        send_data['from_type'] = "system"
                        send_data['from_uid'] = nil
                        send_data['from_uname'] = nil
                        send_data['body'] = nil                                                      

                        json_string = JSON.generate(send_data)                        
                        socket_.send(json_string)
                    end                    
                end
            end

            ws.on :close do |event|
                ip = ws.env['HTTP_X_REAL_IP']
                puts Time.now.to_s + " Close " +  ip + ":" + uid + ":" + uname                  

                settings.sockets.delete(uid)

                # Clear
                ws = nil
                uid = nil
                uname = nil
            end
           
            ws.rack_response  
        end
    end
end