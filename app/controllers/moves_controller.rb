module WebChess
  module Controllers

    class Moves
      include Lotus::Controller

      action 'Create' do
        def call(params)
          #new_move = Model::Move.new(params)
          #@game = Model::GameRepository.find(params[:id])
        end
      end
    
    end

  end
end


