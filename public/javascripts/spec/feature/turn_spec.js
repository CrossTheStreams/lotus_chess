describe("Chess Game",function(){

  describe("Moves", function() {

    beforeEach(function(){
      jasmine.Ajax.install();
    });

    afterEach(function(){
      webChess.board = new ChessBoardView;
      webChess.engine = new Chess;
      webChess.moves = new Game;
      jasmine.Ajax.uninstall(); 
    });

    describe("On the first turn", function(){

      it("a new game", function() {
        expect(webChess.moves.length).toBe(0);
      });

      it("has a the FEN string for a starting chess board.", function(){
        expect(webChess.currentPosition()).toEqual(webChess.startFen);
      });

    });

    describe("making a valid move", function(){

      var move = {from: 'e2', to: 'e4'},
      ajaxPath = '/moves',
      callback = jasmine.createSpy('callback');

      beforeEach(function() {
        spyOn($,'ajax');
        jasmine.Ajax.stubRequest(ajaxPath).andReturn({
          status: 200,
          contentType: 'application/json',
          responseText: 'awesome response' 
        });
        webChess.board.render(move);
      });

      it("adds a move object", function(){
        expect(webChess.moves.length).toBe(1);
      });

      it("changes the FEN string", function(){
        expect(webChess.currentPosition()).not.toEqual(webChess.startFen);
      });

      it("makes a request to create a new move", function() {
        var postRequest = jasmine.objectContaining({
          type: 'POST',
          url: '/moves',
          data: '{"move":{"from":"e2","to":"e4"},"game_id":1,"fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"}' 
        });
        expect($.ajax).toHaveBeenCalledWith(postRequest);
      });

    });

  });

});

