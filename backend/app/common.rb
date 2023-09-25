require "rubygems"
require "sinatra/base"
require "sinatra/config_file"
require "sinatra/json"


class Common < Sinatra::Base
    register Sinatra::ConfigFile

    def self.read_config(file)
        config_file file
    end

    configure :development do
        self.read_config('./develop.yml')
    end

    configure :production do
        self.read_config('./production.yml')
    end

    set :environment, :production
    set :show_exceptions, settings.show_exceptions

    use Rack::Session::Cookie,
      :key    => settings.session_key, 
      :secret => settings.session_sct,
      :expire_after => 3600 * 24 * 30

    # +TODO: create error definition file
    class BadRequest < StandardError; end
    error BadRequest do
        status 400
        error_type = {}
        error_type['result'] = "error"
        error_type['description'] = env['sinatra.error'].message
        json error_type
    end
end