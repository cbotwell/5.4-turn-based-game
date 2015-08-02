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

var newBattle = function(game) {
  $('.game-target').html(AppTemplates.battle());

  heroTargetEl = $('.hero-target');
  enemyTargetEl = $('.enemy-target');
  renderHero(game.hero);
  renderEnemy(game.enemy);

  healthBar = $('.hpbar');
  healthBar.width(game.hero.getHealth + '%');

  attackButtonEl = $('.attack');
  attackButtonEl.html(game.hero.weaponName);

  attackButtonEl.on('click', function() {
    game.hero.attack(game.enemy, 'dualGoldenGuns');
    renderHero(game.hero);
    renderEnemy(game.enemy);

    healthBar.width(game.enemy.getHealth + '%');
    game.turnNumber++;
  });

  if (game.turnNumber % 2 === 1) {
    game.enemy.attack(game.hero, 'chain');
    renderHero(game.hero);
    renderEnemy(game.enemy);

    healthBar.width(game.enemy.getHealth + '%');
    turn++;
  }

  if (game.hero.getHealth <= 0 || game.enemy.getHealth <= 0) {
    $('.game-target').html(AppTemplates.gameover());
  }
};

selectCharacterEl.on('click', function() {
  var indexSelected = $(this).data('index');
  var hero = heros[indexSelected];
  var game = new Game(hero);
  newBattle(game);
});
