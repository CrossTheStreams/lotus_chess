$(document).ready(function(){

   //Backbone.sync = function(method, model) {
     //console.log(method + ": " + JSON.stringify(model));
     //model.set('id', 1);
   //};

   Move = Backbone.Model.extend({
     defaults: function (attribute) {
       return {
         fen: '',
         status: '',
         move: 'start'
       } 
     },
     initialize : function () {
 
     },
     validate : function () {
       return undefined;
     }
   });

  var Game = Backbone.Collection.extend({
    model: Move,
    id: 1,
    url: function () {
      return '/game/'+this.id+'/turns';
    }
  });

  var MoveView = Backbone.View.extend({
    initialize: function () {
      //this.listenTo(this.model, 'change', this.render); 
    },
    render: function (attribute) {
      console.log("foo");
      return this; 
    },
  });

  ChessBoardView = Backbone.View.extend({
    initialize: function() {
      var chessView = this;
      chessView.turns = new Game;
      this.board = new ChessBoard('board', {
        position: 'start',
        draggable: true,
        onChange: function (startPosition, endPosition) {
          var moveString = startPosition + "-" + endPosition;
           chessView.attemptMove(moveString);
        }
      });
    },
    currentPosition: function () {
      var turnCount = this.turns.length; 
      if (turnCount < 1) {
        return "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
      } else {
        return this.turns.first().attributes.fen;
      }
    },
    setBoardCallbacks: function() {
      this.board.onChange
    },
    attemptMove : function (move) {
      var newMove = new Move({move: move});
      this.turns.add(newMove);
      newMove.save();
    }
  });

  game = new ChessBoardView;

});
