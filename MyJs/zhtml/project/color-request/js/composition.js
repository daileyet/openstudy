(function(){  
  var game  = this.colorQuestGame = this.colorQuestGame || {};

  // composition model definition
  // composition is a deck of pattern put together
  var Composition = game.Composition = (function(){
    function Composition(){
      this.data = [];
    }    

    return Composition;
  })();
})();