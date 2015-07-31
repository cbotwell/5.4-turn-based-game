castorTroy = new Character({name: 'Castor Troy', weapons: {dualGoldenGuns: 40}, hitPoints: 100});
memphisRaines = new Character({name: 'Memphis Raines', weapons: {eleanor: 60}, hitPoints: 100});
benjaminGates = new Character({name: 'Benjamin Gates', weapons: {declarationOfIndependence: 50}, hitPoints: 100});
johhnyBlaze = new Character({name: 'Johnny Blaze', weapons: {chain: 30}, hitPoints: 100});

var heros = [castorTroy, memphisRaines, benjaminGates, johhnyBlaze];

$('.game-target').html(AppTemplates.start(heros));

function Game(hero) {
  this.hero = hero;
  this.enemy = johhnyBlaze;
  this.turnNumber = 0;
  this.gameOver = false;
}

var selectCharacterEl = $('.select-character');

selectCharacterEl.on('click', function() {
  var indexSelected = $(this).data('index');
  var hero = heros[indexSelected];

  var game = new Game(hero);
  $('.game-target').html(AppTemplates.battle());
});

var heroTargetEl = $('.hero-target');
var enemyTargetEl = $('.enemy-target');

var renderHero = function(output) {
  var results = AppTemplates.character(output);
  heroTargetEl.html(results);
};

var renderEnemy = function(output) {
  var results = AppTemplates.character(output);
  enemyTargetEl.html(results);
};

renderHero();
renderEnemy();
