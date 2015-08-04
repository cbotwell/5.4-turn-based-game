AppTemplates = {};

AppTemplates['battle'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"center\">\n    <div class=\"battle\">\n        <div class=\"characters\">\n            <div class=\"hero-target\">\n                <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.hero : depth0)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.hero : depth0)) != null ? stack1.name : stack1), depth0))
    + "\">\n                <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.hero : depth0)) != null ? stack1.name : stack1), depth0))
    + "</p>\n                <div class=\"hp\">\n                    <p>HP: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.hero : depth0)) != null ? stack1.getHealth : stack1), depth0))
    + "</p>\n                    <div class=\"hpborder\">\n                        <div class=\"heroHpBar\"></div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"enemy-target\">\n                <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.enemy : depth0)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.enemy : depth0)) != null ? stack1.name : stack1), depth0))
    + "\">\n                <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.enemy : depth0)) != null ? stack1.name : stack1), depth0))
    + "</p>\n                <div class=\"hp\">\n                    <p>HP: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.enemy : depth0)) != null ? stack1.getHealth : stack1), depth0))
    + "</p>\n                    <div class=\"hpborder\">\n                        <div class=\"enemyHpBar\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"messages\">\n            <div class=\"fight\">\n                <i class=\"fa fa-play\"></i>\n                <button class=\"attack\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.hero : depth0)) != null ? stack1.weaponName : stack1), depth0))
    + "</button>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
AppTemplates['gameover'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<button class=\"retry\">\n    Play Again\n</button>\n<div class=\"center\">\n    <div class=\"gameover\">\n        <h1>CAGE WINS!</h1>\n        <p>\n            \"I don't think movies are the reason why this violence exists, I think it's going to happen whether movies are there or not.\" - Nicolas Cage\n        </p>\n    </div>\n</div>\n";
},"useData":true});
AppTemplates['start'] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=this.lambda, alias2=this.escapeExpression;

  return "                <div class=\"character\">\n                    <img src=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.name : stack1), depth0))
    + "\">\n                    <p>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.name : stack1), depth0))
    + "</p>\n                    <button class=\"select-character\" data-index=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\"> Select</button>\n                </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "<div class=\"center\">\n    <div class=\"start\">\n        <h1>CAGE MATCH</h1>\n        <div class=\"characters\">\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 1, blockParams),"inverse":this.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</div>\n";
},"useData":true,"useBlockParams":true});
function Character(options) {
  options = options || {};
  var hitPoints = options.hitPoints || 100;
  this.weapons = options.weapons || {};
  this.weaponName = options.weaponName;
  this.name = options.name;
  this.imgUrl = options.imgUrl;

  this.takeDamage = function(damage) { hitPoints -=  damage; };

  this.getAttackStrength = function(weaponName) {
    if (this.weapons[weaponName]) {
      return this.weapons[weaponName];
    }

    return 5;
  };

  this.on('attacked', function(amount) {
    this.takeDamage(amount);
  });

  this.getHealth = function() {return hitPoints;};
}

Character.prototype = _.extend({
  constructor: Character,

  attack: function(hostile, weapon) {
    hostile.trigger('attacked', this.getAttackStrength(weapon));
  }

}, Backbone.Events);

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

  this.renderHealth = function(game) {
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
    this.renderHealth(game);
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

  gameTargetEl.on('click', '.attack', function() {
    game.hero.attack(game.enemy, 'dualGoldenGuns');
    game.enemy.attack(game.hero, 'chain');
    game.turnNumber++;

    if (game.enemy.getHealth() <= 0 || game.hero.getHealth() <= 0) {
      gameTargetEl.html(AppTemplates.gameover());
    } else {
      game.renderBattle(game);
    }
  });

  gameTargetEl.on('click', '.retry', function() {
    gameTargetEl.html(AppTemplates.start(heroes));
  });
};
//# sourceMappingURL=app.map