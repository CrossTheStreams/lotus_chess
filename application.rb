require 'lotus'
require 'pry'
require 'byebug'
require 'pg'
require 'lotus/model'
require 'lotus/model/adapters/sql_adapter'
require 'rack/parser'

module WebChess

  def self.env
    @env 
  end

  class Application < Lotus::Application

    configure do

      middleware.use Rack::Parser, :parsers => { 'application/json' => proc { |data| JSON.parse data }}

      routes 'config/routes'

      WebChess.instance_variable_set(:@env,ENV['RACK_ENV'])

      load_paths << [
        'app/controllers',
        'app/views',
        'app/models'
      ]
      
    end

  end
end
