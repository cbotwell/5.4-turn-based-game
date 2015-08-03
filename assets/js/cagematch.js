castorTroy = new Character({name: 'Castor Troy', weapons: {dualGoldenGuns: 40}, weaponName: 'Dual Golden Guns', hitPoints: 100, imgUrl: 'nic.png'});
memphisRaines = new Character({name: 'Memphis Raines', weapons: {eleanor: 60}, weaponName: 'Eleanor', hitPoints: 100, imgUrl: 'nic.png'});
benjaminGates = new Character({name: 'Benjamin Gates', weapons: {declarationOfIndependence: 50}, weaponName: 'Declaration of Independence', hitPoints: 100, imgUrl: 'nic.png'});
johhnyBlaze = new Character({name: 'Johnny Blaze', weapons: {chain: 30}, weaponName: 'Chain', hitPoints: 100, imgUrl: 'nic.png'});

var heros = [castorTroy, memphisRaines, benjaminGates, johhnyBlaze];

$('.game-target').html(AppTemplates.start(heros));

function Game(hero) {
  this.hero = hero;
  this.enemy = johhnyBlaze;
  this.turnNumber = 0;
  this.gameOver = false;
}

Game.prototype = _.extend({
  constructor: Game,

  isGameOver: function() {
    //something?
  }
}, Backbone.Events);

var gameTargetEl = $('.game-target');

gameTargetEl.on('click', '.select-character', function() {
  var indexSelected = $(this).data('index');
  var hero = heros[indexSelected];
  var game = new Game(hero);
  newBattle(game);
});

var healthBar;

var newBattle = function(game) {
  gameTargetEl.html(AppTemplates.battle(game));
  healthBar = $('.hpbar');
  healthBar.width(game.enemy.getHealth() + '%');

  gameTargetEl.on('click', '.attack', function() {
    game.hero.attack(game.enemy, 'dualGoldenGuns');
    healthBar.width(game.enemy.getHealth + '%');
    game.turnNumber++;
    healthBar.width(game.enemy.getHealth() + '%');

    if (game.enemy.getHealth() <= 0 || game.hero.getHealth() <= 0) {
      gameTargetEl.html(AppTemplates.gameover());
    } else {
      gameTargetEl.html(AppTemplates.battle(game));
    }
  });

  gameTargetEl.on('click', '.retry', function() {
    gameTargetEl.html(AppTemplates.start(heros));
  });

  //trying to figure out how to use the below stuff

  if (game.turnNumber % 2 === 1) {
    game.enemy.attack(game.hero, 'chain');

    healthBar.width(game.enemy.getHealth + '%');
    turn++;
  }

  if (game.gameOver) {
    $('.game-target').html(AppTemplates.gameover());
  }
};
