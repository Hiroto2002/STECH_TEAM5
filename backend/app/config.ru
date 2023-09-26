#require "rubygems"
#require "sinatra"
require 'thin'
require './app.rb'

Faye::WebSocket.load_adapter('thin')
run App