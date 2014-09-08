module WebChess
  module Model

    class Game
      include Lotus::Entity
      self.attributes = :id

    end


    class GameRepository
      include Lotus::Repository


    end

  end
end
