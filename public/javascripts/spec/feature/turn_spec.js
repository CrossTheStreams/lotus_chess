
describe("Chess Game",function(){
  var game;

  describe("Turns", function() {

    beforeEach(function(){
      game = new ChessBoardView;
    });

    describe("On the first turn", function(){

      // TODO: Perhaps a first turn starts after a button is pushed or something?
      it("the game has zero turns.", function() {
        expect(game.turns.length).toBe(0);
      });

      it("has a the FEN string for a starting chess board.", function(){
        expect(game.currentPosition()).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
      });

    });

    describe("Making a move", function(){

      beforeEach(function() {
        game.board.move('e2-e4');
      });

      it("adds a turn object to the game", function(){
        expect(game.turns.length).toBe(1);
      });

      it("changes the FEN string",function(){
        expect(game.currentPosition()).not.toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
      });

    });

  });

});

