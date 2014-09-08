module WebChess
  module Views
    class Game

      class Show
        include WebChess::View
        layout :application

        def current_fen
          @game.current_fen 
        end

      end

    end
  end
end


