module WebChess
  module Controllers

    class Games
      include Lotus::Controller

      action 'Show' do
        expose :game
        def call(params)
          @game = Model::GameRepository.find(params[:id])
        end
      end
    
    end

  end
end


