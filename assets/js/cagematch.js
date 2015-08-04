castorTroy = new Character({name: 'Castor Troy', weapons: {dualGoldenGuns: 40}, weaponName: 'Dual Golden Guns', hitPoints: 100, imgUrl: 'castor.png'});
memphisRaines = new Character({name: 'Memphis Raines', weapons: {eleanor: 60}, weaponName: 'Eleanor', hitPoints: 100, imgUrl: 'memphis.png'});
benjaminGates = new Character({name: 'Benjamin Gates', weapons: {declarationOfIndependence: 50}, weaponName: 'Declaration of Independence', hitPoints: 100, imgUrl: 'benjamin.png'});
johhnyBlaze = new Character({name: 'Johnny Blaze', weapons: {chain: 30}, weaponName: 'Chain', hitPoints: 100, imgUrl: 'johnny.png'});

var heroes = [castorTroy, memphisRaines, benjaminGates, johhnyBlaze];
var gameTargetEl = $('.game-target');

gameTargetEl.html(AppTemplates.start(heroes));

function Game(hero) {
  this.hero = _.clone(hero);
  this.enemy = _.clone(_.sample(heroes));
  this.turnNumber = 0;
  this.gameOver = false;

  this.updateHealth = function(game) {
    var heroHealthBar = $('.heroHpBar');
    heroHealthBar.width(game.hero.getHealth() + '%');
    var enemyHealthBar = $('.enemyHpBar');
    enemyHealthBar.width(game.enemy.getHealth() + '%');

    if (game.enemy.getHealth() <= 20) {
      enemyHealthBar.addClass('lowHealth');
    }

    if (game.hero.getHealth() <= 20) {
      heroHealthBar.addClass('lowHealth');
    }
  };

  this.renderBattle = function(game) {
    gameTargetEl.html(AppTemplates.battle(game));
  };
}

Game.prototype = _.extend({
  constructor: Game,

  isGameOver: function() {
    //something?
  }
}, Backbone.Events);

gameTargetEl.on('click', '.select-character', function() {
  var indexSelected = $(this).data('index');
  var hero = heroes[indexSelected];
  var game = new Game(hero);
  newBattle(game);
});

var newBattle = function(game) {
  game.renderBattle(game);
  game.updateHealth(game);

  gameTargetEl.on('click', '.attack', function() {
    game.hero.attack(game.enemy, 'dualGoldenGuns');
    game.enemy.attack(game.hero, 'chain');
    game.turnNumber++;

    if (game.enemy.getHealth() <= 0 || game.hero.getHealth() <= 0) {
      gameTargetEl.html(AppTemplates.gameover());
    } else {
      game.renderBattle(game);
      game.updateHealth(game);
    }
  });

  gameTargetEl.on('click', '.retry', function() {
    gameTargetEl.html(AppTemplates.start(heroes));
  });
};
