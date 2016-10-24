// letter fall speed
var Speed = 150;

// maximum number of letters on screen at once
var MaxLettersOnScreen = 5;

// letter size
var FontSize = 42;

// letter color
var FontColor = "white";

// letter font family
var Font = "Times New Roman";

// color of explosion
var ExplosionColor = "red";

// density of explosion
var ExplosionParticles = 200;

// explosion duration
var ExplosionTime = 1000;

// number of attempts per game
var Lives = 3;

// character to identify a game "life"
var LifeCharacter = "@"

// color for game life
var LifeFontColor = "green";




















/* DO NOT EDIT BELOW THIS LINE */


function preload() {
  game.input.keyboard.addCallbacks(this, onDown);
  drawScore();
  drawLives();
  game.input.onDown.addOnce(function(e) {
    startGame();
  });
  game.debug.text( "Click to start", game.world.centerX - 100, game.world.centerY);
}

var LetterGroup;
var GameScoreText;
var LivesText;
var ValidLetters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];
var LettersOnScreen = {};
var Score = 0;
var Level = 0;
var PointerPerLevel = 10;

MyParticle = function (game, x, y) {
  Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData("particleShade"));
};

MyParticle.prototype = Object.create(Phaser.Particle.prototype);
MyParticle.prototype.constructor = MyParticle;

function randomStartCoords() {
  var x = game.rnd.integerInRange(100, game.world.width - 100);
  var y = game.rnd.integerInRange(-200, 0);
  return { x: x, y: y };
}

function removeLetterFromScreen(letter) {
  delete LettersOnScreen[letter];
}

function addLetterToScreen(letter, sprite) {
  LettersOnScreen[letter] = sprite;
}

function NextLevel() {
  Speed = Speed;
  // MinVelocity = MaxVelocity * 0.9
  // MaxVelocity = MaxVelocity * 1.08
}

function onDown(event) {
  if (game.physics.arcade.isPaused) {
    return
  }
  var letter = String.fromCharCode(event.keyCode || event.which).toUpperCase();
  var sprite = LettersOnScreen[letter];
  if (sprite) {
    var emitter = getExplosion(sprite.x, sprite.y);
    emitter.start(true, ExplosionTime, 0, emitter.maxParticles);
    updateScore(1);
    resetSprite(sprite);
    if (Score % PointerPerLevel == 0) {
      Level += 1;
      NextLevel();
    }
  }
}

function resetSprite(sprite) {
  sprite.kill();
  removeLetterFromScreen(sprite.text);
  var coords = randomStartCoords();
  sprite.text = getNewLetter();
  addLetterToScreen(sprite.text, sprite);
  sprite.reset(coords.x, coords.y);
  sprite.body.velocity.y = getVelocity();
}

function gameOver() {
  game.physics.arcade.isPaused = true;
  GameScoreText.fontSize = 20;
  var text = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER");
  text.anchor.set(0.5);
  text.fontSize = 80;
  text.fill = "#ffffff";
}

function outOfBounds(sprite) {
  if (sprite.y > game.world.height) {
    takeLife();
    resetSprite(sprite);
  }
}

function takeLife() {
  Lives -= 1;
  LivesText.text = livesText();
  if (Lives == 0) {
    gameOver();
  }
}

function updateScore(n) {
  Score += n;
  GameScoreText.text = scoreText();
}

function livesText() {
  var lives = [];
  for (var i = 0; i < Lives; i++) {
    lives.push(LifeCharacter);
  }
  return lives.join(" ");
}

function scoreText() {
  return "score: " + Score;
}

function drawScore() {
  GameScoreText = game.add.text(10, 10, scoreText());
  GameScoreText.fill = "#999999";
  GameScoreText.fontSize = 14;
}

function drawLives() {
  LivesText = game.add.text(game.world.width - 10, 10, livesText());
  LivesText.anchor.set(1, 0);
  LivesText.fill = LifeFontColor;
  LivesText.fontSize = 14;
}

function getNewLetter() {
  var letter;
  while (true) {
    var randIndex = game.rnd.integerInRange(0, ValidLetters.length - 1);
    letter = ValidLetters[randIndex];
    if (!LettersOnScreen[letter]) {
      break
    }
  }
  return letter;
}

function getVelocity() {
  return Speed;
  // return game.rnd.integerInRange(MinVelocity, MaxVelocity);
}

function spawnLetters() {
  for (var i = Object.keys(LettersOnScreen).length; i < Math.min(MaxLettersOnScreen, ValidLetters.length); i++) {
    var letter = getNewLetter();
    var coords = randomStartCoords();
    var sprite = LetterGroup.create(coords.x, coords.y, letter, {fontWeight: "bold"});
    sprite.anchor.set(0.5);
    sprite.font = Font;
    sprite.fill = FontColor;
    sprite.fontSize = FontSize;
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.enableBody = true;
    sprite.body.velocity.y = getVelocity();
    sprite.checkWorldBounds = true;
    sprite.events.onOutOfBounds.add(outOfBounds, this);
    LettersOnScreen[letter] = sprite;
  }
}

function getExplosion(x,y) {
  var emitter = game.add.emitter(x, y, ExplosionParticles);
  emitter.width = 0;
  emitter.particleClass = MyParticle;

  emitter.makeParticles();
  return emitter;
}

function setUpExplosion() {
  var bmd = game.add.bitmapData(2, 2);
  bmd.context.fillStyle = ExplosionColor;
  bmd.context.fillRect(0, 0, 2, 2);
  game.cache.addBitmapData('particleShade', bmd);
}

function startGame() {
  game.debug.reset();
  LetterGroup = game.add.group();
  LetterGroup.classType = Phaser.Text;
  spawnLetters();
  setUpExplosion();
}

function create() {
}

function update() {
}

function render() {

}

if (!game) {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
}
