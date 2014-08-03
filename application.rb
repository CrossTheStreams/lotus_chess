require 'lotus'

module WebChess

  def self.env
    @@env 
  end

  class Application < Lotus::Application
    configure do
      routes 'config/routes'

      WebChess.class_variable_set(:@@env,ENV['RACK_ENV'])

      load_paths << [
        'app/controllers',
        'app/views'
      ]
    end

  end
end
