module WebChess
  module Controllers

    class Moves
      include Lotus::Controller

      class Create
        include Lotus::Action

        def call(params)
          byebug
          puts "Moves controller"
          puts params.to_h
          #@game = Model::GameRepository.find(params[:id])
          #move = Move.new(json: params[:move]
          #Model::MoveRepository.save(move)
        end

      end

    end
  end
end


