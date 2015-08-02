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

var selectCharacterEl = $('.select-character');

var heroTargetEl = [];
var enemyTargetEl = [];

var renderHero = function(hero) {
  heroTargetEl.html(AppTemplates.character(hero));
};

var renderEnemy = function(enemy) {
  enemyTargetEl.html(AppTemplates.character(enemy));
};

var attackButtonEl = [];

var healthBar = [];

var newBattle = function() {
  $('.game-target').html(AppTemplates.battle());

  heroTargetEl = $('.hero-target');
  enemyTargetEl = $('.enemy-target');
  renderHero(currentHero);
  renderEnemy(currentEnemy);

  healthBar = $('.hpbar');
  healthBar.width(currentHero.getHealth + '%');

  attackButtonEl = $('.attack');
  attackButtonEl.html(currentHero.weaponName);

  attackButtonEl.on('click', function() {
    currentHero.attack(currentEnemy, 'dualGoldenGuns');
    renderHero(currentHero);
    renderEnemy(currentEnemy);

    healthBar.width(currentEnemy.getHealth + '%');
    turn++;
  });

  if (turn % 2 === 1) {
    currentEnemy.attack(currentHero, 'chain');
    renderHero(currentHero);
    renderEnemy(currentEnemy);

    healthBar.width(currentEnemy.getHealth + '%');
    turn++;
  }

  if (currentHero.getHealth <= 0 || currentEnemy.getHealth <= 0) {
    $('.game-target').html(AppTemplates.gameover());
  }
};

var currentHero = {};
var currentEnemy = {};
var turn = 0;

selectCharacterEl.on('click', function() {
  var indexSelected = $(this).data('index');
  var hero = heros[indexSelected];
  var game = new Game(hero);
  currentHero = game.hero;
  currentEnemy = game.enemy;
  turn = game.turnNumber;

  newBattle();
});
