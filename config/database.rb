module WebChess

  def self.adapter
    @adapter ||= Lotus::Model::Adapters::SqlAdapter.new(WebChess::Model.mapper, "postgres://localhost:5432/web_chess_#{WebChess.env}")
  end

  module Model

    def self.mapper
      @mapper ||= Lotus::Model::Mapper.new do

        collection :games do
          entity Game
          attribute :id, Integer
        end

        collection :moves do
          entity Move
          attribute :id, Integer
          attribute :game_id, Integer
          attribute :json, String
          attribute :valid, Boolean
        end

      end.load!

    end
    
    [GameRepository,MoveRepository].each do |repository|
      repository.adapter = WebChess.adapter
    end

  end

end
