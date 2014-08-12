
describe("Chess Game",function(){
  var game;

  describe("Turns", function() {

    beforeEach(function(){
      game = new ChessBoardView;
      jasmine.Ajax.install();
    });

    afterEach(function(){
      jasmine.Ajax.uninstall(); 
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
      var move = 'e2-e4',
      ajaxPath = '/game/1/move/create/'+move,
      callback = jasmine.createSpy('callback');

      beforeEach(function() {
        game.attemptMove(callback({url: ajaxPath, data: {move: move}}));

        jasmine.Ajax.stubRequest(ajaxPath).andReturn({
          status: 200,
          contentType: 'text/plain',
          responseText: 'awesome response' 
        });
      });

      it("adds a turn object to the game", function(){
        expect(game.turns.length).toBe(1);
      });

      it("changes the FEN string",function(){
        expect(game.currentPosition()).not.toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
      });

      it("makes a request to create a new move",function(){
        expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({ url : ajaxPath, data: { move: move} }));
      });

    });

  });

});

