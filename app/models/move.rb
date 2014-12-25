require 'lotus/model'

module WebChess
  module Model
    class Move
      include Lotus::Entity

      self.attributes = :id, :game_id, :json


      def to_json
        JSON.parse(json, symbolize_names: true)
      end

    end
  end
end

module WebChess
  module Model
    class MoveRepository
      include Lotus::Repository


    end
  end
end

