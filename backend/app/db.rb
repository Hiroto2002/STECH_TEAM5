require "sinatra/base"
require "mysql2"
require "./common.rb"

class DB < Common
    def execSQLonWS(sql, *args)
        mysql = Mysql2::Client.new(
            :host =>      settings.mysql_host, 
            :username =>  settings.mysql_user, 
            :password =>  settings.mysql_pass, 
            :database =>  settings.mysql_database, 
            :charset =>   settings.mysql_charset, 
            :encoding =>  settings.mysql_encode, 
            :collation => settings.mysql_collation)
        statement = mysql.prepare(sql)
        cmd = 'statement.execute('
        args.size.times do |index|
            cmd += "," if index>0 
            cmd += "args[#{index}]"
        end
        cmd += ')'
        res = eval(cmd)  
        puts Time.now.to_s + " exec SQL on Websocket handler."
        mysql.close()  
        return res 
    end

    
    def execSQL(sql, *args)        
        statement = @mysql.prepare(sql)
        cmd = 'statement.execute('
        args.size.times do |index|
            cmd += "," if index>0 
            cmd += "args[#{index}]"
        end
        cmd += ')'    
        return eval(cmd)
    end

    before do
        @mysql = Mysql2::Client.new(
            :host =>      settings.mysql_host, 
            :username =>  settings.mysql_user, 
            :password =>  settings.mysql_pass, 
            :database =>  settings.mysql_database, 
            :charset =>   settings.mysql_charset, 
            :encoding =>  settings.mysql_encode, 
            :collation => settings.mysql_collation)
    end

    after do        
        @mysql.close()
        @mysql = nil
    end

    def insertSQL(table, *columns)
        sql0 = "insert into #{table} ("
        sql1 = ""
        columns.size.times do |index|
            sql0 += "," if index>0
            sql0 += "#{columns[index]}"
            sql1 += "," if index>0
            sql1 += "?"
        end
        sql1 += ");"
        sql0 += ") values ("
        sql = sql0 + sql1
        return sql
    end    
end