castorTroy = new Character({name: 'Castor Troy', weapons: {dualGoldenGuns: 40}, hitPoints: 100, imgUrl: 'nic.png'});
memphisRaines = new Character({name: 'Memphis Raines', weapons: {eleanor: 60}, hitPoints: 100, imgUrl: 'nic.png'});
benjaminGates = new Character({name: 'Benjamin Gates', weapons: {declarationOfIndependence: 50}, hitPoints: 100, imgUrl: 'nic.png'});
johhnyBlaze = new Character({name: 'Johnny Blaze', weapons: {chain: 30}, hitPoints: 100, imgUrl: 'nic.png'});

var heros = [castorTroy, memphisRaines, benjaminGates, johhnyBlaze];

$('.game-target').html(AppTemplates.start(heros));

function Game(hero) {
  this.hero = hero;
  this.enemy = johhnyBlaze;
  this.turnNumber = 0;
  this.gameOver = false;
}

var selectCharacterEl = $('.select-character');

var heroTargetEl = [];
var enemyTargetEl = [];

var renderHero = function(hero) {
  heroTargetEl.html(AppTemplates.character(hero));
};

var renderEnemy = function(enemy) {
  enemyTargetEl.html(AppTemplates.character(enemy));
};

var attackButtonEl = $('.attack');

var newBattle = function() {
  $('.game-target').html(AppTemplates.battle());
  heroTargetEl = $('.hero-target');
  enemyTargetEl = $('.enemy-target');
  renderHero(currentHero);
  renderEnemy(currentEnemy);
  attackButtonEl.html('weapon');
};

var currentHero = {};
var currentEnemy = {};

selectCharacterEl.on('click', function() {
  var indexSelected = $(this).data('index');
  var hero = heros[indexSelected];
  var game = new Game(hero);
  currentHero = game.hero;
  currentEnemy = game.enemy;
  newBattle();
});
