require "rubygems"
require "sinatra/base"
require "./socks.rb"

class App < Socks
   get '/' do
     return "This is www.mizuhugu35.com server root! presents by ３秒クッキング ~爆速開発編~"
   end
end
