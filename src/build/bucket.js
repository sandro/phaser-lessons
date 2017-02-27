var arrows, item, bucket, emitter, cloud, pipe1, pipe2, pipe3, pipe4;
var rainDirection = 1;
var rainSaved = 0;
var velocity = 12;
var rainAmount = 1;
var rainLifespan = 1000;
var GameTime = 20;
var rainDrop;
var GameScoreText,TimerText;
var splashEmitter;

var MaxSplashParticles = 40;
var SingleSplashParticles = 20;
var SplashLifespan = 500;
var SplashYRange = 0;
var SplashXRange = 0;
var MaxSplashSize = 20;

var LeakMaxSpeed = 500;

function tick() {
  if (arrows.right.isDown) {
    bucket.x += velocity;
  }
  if (arrows.left.isDown) {
    bucket.x -= velocity;
  }
}

function bucketCollide(bucket, particle) {
  rainSaved += 1;
  particle.kill();
  GameScoreText.text = scoreText();
  splashEmitter.x = bucket.x + 60;
  splashEmitter.y = bucket.y;
  splashEmitter.explode(SplashLifespan, SingleSplashParticles);
}

function scoreText() {
  return "Water Saved: " + rainSaved
}

function drawScore() {
  GameScoreText = game.add.text(10, 35, scoreText());
  GameScoreText.fill = "#FFF";
  GameScoreText.fontSize = 14;
}

function drawTimer() {
  TimerText = game.add.text(750, 35, GameTime);
  TimerText.fill = "yellow";
  TimerText.fontSize = 16;
}

function drawGameOver() {
  game.physics.arcade.isPaused = true;
  GameScoreText.fontSize = 20;
  var text = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER");
  text.anchor.set(0.5);
  text.fontSize = 80;
  text.fill = "#ffffff";
  emitter.on = false;
}

function update() {
  if (game.physics.arcade.isPaused) {
    return;
  }

  if (GameTime <= 5) {
    TimerText.fill = "red";
  }
  if (GameTime <= 0) {
    drawGameOver();
  }
  TimerText.text = GameTime;

  tick();
  game.physics.arcade.collide(emitter, bucket, bucketCollide);
}

function preload() {
  // game.load.baseURL = 'https://sandro.github.io/phaser-lessons/src/img';
  // game.load.crossOrigin = 'anonymous';
  game.load.image('bucket', 'img/bucket.png');
  game.load.image("pipe", "img/pipe.png");
  var rainDrop = makeRainDrop(20);
  emitter = game.add.emitter(game.world.centerX, 30, rainAmount);
  emitter.width = 400;
  emitter.makeParticles(rainDrop, 0, emitter.maxParticles, true, false);
  emitter.gravity = 800;
  emitter.minParticleScale = 1;
  emitter.maxParticleScale = 1;
  emitter.setXSpeed(0,5);
  emitter.setYSpeed(350, LeakMaxSpeed);
  emitter.start(false, rainLifespan, 10);

  splashEmitter = game.add.emitter(0, 0, 40);
  splashEmitter.width = 50;
  splashEmitter.makeParticles(makeRainDrop(MaxSplashSize), 0);
  splashEmitter.minParticleScale = 0.15;
  splashEmitter.maxParticleScale = 1;
  splashEmitter.setYSpeed(-250 - SplashYRange, 0 + SplashYRange);
  splashEmitter.setXSpeed(-50 - SplashXRange, 50 + SplashXRange);
  splashEmitter.gravity = 400;

  arrows = game.input.keyboard.createCursorKeys();
}

function makePipes() {
  var pipeGroup = game.add.group();
  pipe1 = pipeGroup.create(5, 0, "pipe");
  pipe2 = pipeGroup.create(pipe1.x + pipe1.width - 3, 0, "pipe");
  pipe3 = pipeGroup.create(pipe2.x + pipe2.width - 3, 0, "pipe");
  pipe4 = pipeGroup.create(pipe3.x + pipe3.width - 3, 0, "pipe");
}


function makeRainDrop(radius) {
  var graphics = game.add.graphics(10, 10);
  graphics.moveTo(10, 10);
  graphics.beginFill(0xB6DAFF);
  graphics.drawCircle(10,10,radius);
  graphics.endFill();
  txt = graphics.generateTexture();
  graphics.destroy();
  return txt;
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  bucket = game.add.sprite(30, 480, 'bucket')
  makePipes();
  game.physics.arcade.enable(bucket);
  bucket.body.collideWorldBounds = true;
  bucket.body.immovable = true;
  game.physics.arcade.enable(emitter);
  drawScore();
  drawTimer();
  var timer = game.time.create();
  timer.loop(1000, function() {
    GameTime -= 1;
    if (GameTime <= 0) {
      timer.stop();
    }
  });
  timer.start();
}
