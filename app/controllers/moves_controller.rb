require 'json'
require 'lotus/utils/hash'

module WebChess
  module Controllers

    class Moves
      include Lotus::Controller

      class Create
        include Lotus::Action

        def call(params)
          byebug
          #@game = Model::GameRepository.find(params[:id])
          #move = Move.new(json: params[:move]
          #Model::MoveRepository.save(move)
        end

      end

    end
  end
end


