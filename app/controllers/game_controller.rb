module WebChess
  module Controllers

    class Game 
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


