require 'json'
require 'lotus/utils/hash'

module WebChess
  module Controllers

    class Moves
      include Lotus::Controller

      class Create
        include Lotus::Action

        def call(params)
          create_attributes = create_attributes_from_params(params) 
          move = Model::Move.new(create_attributes)
          Model::MoveRepository.create(move)
        end

        def create_attributes_from_params(params)
          json_body = params.env["rack.request.form_hash"]
          {game_id: json_body[:game_id], json: json_body.to_json}
        end

      end

    end
  end
end


