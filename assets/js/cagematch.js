castorTroy = new Character({name: 'Castor Troy', weapons: {dualGoldenGuns: 40}, hitPoints: 100});
memphisRaines = new Character({name: 'Memphis Raines', weapons: {eleanor: 60}, hitPoints: 100});
benjaminGates = new Character({name: 'Benjamin Gates', weapons: {declarationOfIndependence: 50}, hitPoints: 100});
johhnyBlaze = new Character({name: 'Johnny Blaze', weapons: {chain: 30}, hitPoints: 100});

$('.game-target').html(AppTemplates.battle());

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
