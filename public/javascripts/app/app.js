$(document).ready(function(){

  var Turn = Backbone.Model.extend({
    defaults: function (attribute) {
      return {
        fen: '',
        status: '',
        move: 'start'
      } 
    },
    initialize : function () {
      console.log("move = "+this.move); 
    },
    post : function() {
      var move = this.move;
      $.ajax({
        url : '/game/1/move/create',
        data : {move: move}
      }) 
    }
  });

  var TurnList = Backbone.Collection.extend({
    model: Turn
  });

  var Turns = new TurnList;

  var TurnView = Backbone.View.extend({
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
      chessView.turns = new TurnList;
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
      var newTurn = new Turn({move: move});
      this.turns.add(newTurn);
    }
  });

  game = new ChessBoardView;

});
