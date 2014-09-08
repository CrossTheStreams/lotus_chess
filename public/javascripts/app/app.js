$(document).ready(function(){

  webChess = {
    startFen: (new Chess().fen())
  } || webChess;

  Move = Backbone.Model.extend({
     defaults: function (attribute) {
       return {
         move: 'start'
       } 
     },
     initialize : function () { 
     },
     url: function () {
       return '/games/1/moves';
     },
     validate : function (attributes, options) {
       moveObj = attributes.move, 
       results = webChess.engine.move(moveObj);

       if (results) {
         console.log("results are valid");
         // set the move's FEN string to the new state of the board
         this.attributes.fen = webChess.engine.fen();
         return undefined;
       } else {
         console.log('move is invalid');
         return "invalid move" 
       }
     }
  });

  MoveList = Backbone.Collection.extend({
    model: Move,
    id: 1
  });

  var MoveView = Backbone.View.extend({
    initialize: function () {
      //this.listenTo(this.model, 'change', this.render); 
    },
    render: function (attribute) {
      return this; 
    },
  });

  ChessBoardView = Backbone.View.extend({
    id: 'board',
    initialize: function(options) {
      var chessView = this;
      chessView.moves = new MoveList;
      this.board = new ChessBoard('board', {
        position: 'start',
        draggable: true,
        onChange: function (startPosition, endPosition) {
          chessView.attemptMove({from: startPosition, to: endPosition});
        }
      });
    },
    currentPosition: function () {
      var lastMove = this.moves.last();
      if (lastMove) {
        return lastMove.fen;
      } else {
        return webChess.startFen; 
      }
    },
    setBoardCallbacks: function() {
      this.board.onChange
    },
    attemptMove : function (move) {
      var newMove = new Move({move: move});
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
  });

  webChess.board = new ChessBoardView;

  if (typeof(webChess.board.currentPosition()) == webChess.startFen) {
    webChess.engine = new Chess();
  } else {  
    webChess.engine = new Chess(webChess.board.currentPosition());
  }


});

