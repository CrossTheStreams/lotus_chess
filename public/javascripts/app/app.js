$(document).ready(function(){

  Move = Backbone.Model.extend({
     defaults: function (attribute) {
       return {
         move: 'start',
         game_id: 1
       } 
     },
     initialize : function () { 
     },
     url: function () {
       return '/moves';
     },
     validate : function (attributes, options) {
       var moveObj = attributes.move, 
       results = webChess.engine.move(moveObj);

       if (results) {
         console.log(results);
         // set the move's FEN string to the new state of the board
         this.attributes.fen = webChess.engine.fen();
         return undefined;
       } else {
         return "invalid move" 
       }
     }
  });

  MoveList = Backbone.Collection.extend({
    model: Move,
  });
 
  ChessBoardView = Backbone.View.extend({
    id: 'board',
    initialize: function(options) {
      var chessView = this;
      this.board = new ChessBoard('board', {
        position: 'start',
        draggable: true,
        onDrop: function (startPosition, endPosition) {
          //console.log(startPosition);
          //console.log(endPosition);
          chessView.render({from: startPosition, to: endPosition});
        }
      });
    },
    render: function (move) {
      webChess.attemptMove(move);
      return this;
    }
  });

  webChess = {
    startFen: (new Chess().fen()),
    moves: (new MoveList),
    board: (new ChessBoardView),
    currentPosition: function () {
      var lastMove = this.moves.last();
      if (lastMove) {
        return lastMove.attributes.fen;
      } else {
        return webChess.startFen; 
      }
    },
    attemptMove: function (move) {
      var newMove = new Move({move: move});
      foo = newMove;
      newMove.save();
      // add this move if it's valid
      if (!newMove.validationError) {
        this.moves.add(newMove);
        //console.log("move was successful");
        return newMove;
      } else {
        //console.log("move was invalid"); 
      }
    }
  };

  // set the starting position for the engine
  if (typeof(webChess.currentPosition()) == webChess.startFen) {
    webChess.engine = new Chess();
  } else {  
    webChess.engine = new Chess(webChess.currentPosition());
  }

});

