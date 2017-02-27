var sprites = [];
var arrows, item, bucket, emitter, cloud, pipe1, pipe2, pipe3, pipe4;
var rainDirection = 1;
var rainSaved = 0;
var velocity = 10;
var rainAmount = 1;
var rainLifespan = 1000;
var MaxTime = 20;
var rainDrop;
var GameScoreText,TimerText;
var splashEmitter;

function bucketCollide(bucket, particle) {
  rainSaved += 1;
  particle.kill();
  GameScoreText.text = scoreText();
  splashEmitter.x = bucket.x + 60;
  splashEmitter.y = bucket.y;
  splashEmitter.explode(500, 20);
  console.log(particle);
}

function scoreText() {
  return "Rain Saved: " + rainSaved
}

function drawScore() {
  GameScoreText = game.add.text(10, 35, scoreText());
  GameScoreText.fill = "#FFF";
  GameScoreText.fontSize = 14;
}

function drawTimer() {
  TimerText = game.add.text(750, 35, MaxTime);
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

  var timeLeft = MaxTime - Math.floor(game.time.now / 1000);
  if (timeLeft <= 5) {
    TimerText.fill = "red";
  }
  if (timeLeft <= 0) {
    drawGameOver();
  }
  TimerText.text = timeLeft;


  if (arrows.right.isDown) {
    bucket.x += velocity;
  }
  if (arrows.left.isDown) {
    bucket.x -= velocity;
  }

  game.physics.arcade.collide(emitter, bucket, bucketCollide);

  if (emitter.x + 50 > game.world.width) {
    rainDirection = -1;
  } else if (emitter.x + 50 < 0) {
    rainDirection = 1;
  }
  // emitter.x = emitter.x + rainDirection;
  // cloud.x += rainDirection;
  // rainDrop
}

function preload() {
  game.load.image('bucket', 'img/bucket.png');
  game.load.image("cloud", "img/cloud.png");
  game.load.image("pipe", "img/pipe.png");
  var rainDrop = makeRainDrop(20);
  emitter = game.add.emitter(game.world.centerX, 30, rainAmount);
  emitter.width = 500;
  emitter.makeParticles(rainDrop, 0, emitter.maxParticles, true, false);
  emitter.gravity = 800;
  emitter.minParticleScale = 1;
  emitter.maxParticleScale = 1;
  emitter.setXSpeed(0,5);
  emitter.setYSpeed(350, 500);
  emitter.start(false, rainLifespan, 10);

  splashEmitter = game.add.emitter(0, 0, 40);
  splashEmitter.width = 50;
  splashEmitter.makeParticles(makeRainDrop(10), 0);
  splashEmitter.minParticleScale = 0.5;
  splashEmitter.maxParticleScale = 1;
  splashEmitter.setYSpeed(-250, 0);
  splashEmitter.setXSpeed(-50, 50);
  splashEmitter.gravity = 400;

  arrows = game.input.keyboard.createCursorKeys();
}

function makePipes() {
  var pipeGroup = game.add.group();
  pipe1 = pipeGroup.create(5, 0, "pipe");
  // pipe = game.add.sprite(0, 0, "pipe");
  pipe2 = pipeGroup.create(pipe1.x + pipe1.width - 3, 0, "pipe");
  pipe3 = pipeGroup.create(pipe2.x + pipe2.width - 3, 0, "pipe");
  pipe4 = pipeGroup.create(pipe3.x + pipe3.width - 3, 0, "pipe");
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  bucket = game.add.sprite(30, 480, 'bucket')
  // cloud = game.add.sprite(emitter.x - 100, 0, "cloud");
  makePipes();
  game.physics.arcade.enable(bucket);
  // bucket.body.bounce.set(0);
  bucket.body.collideWorldBounds = true;
  bucket.body.immovable = true;
  game.physics.arcade.enable(emitter);
  drawScore();
  drawTimer();
  // emitter.body.bounce.set(0);
  // emitter.body.mass = 0;
  // rainDrop.body.mass = 0;

  // emitter.body.collideWorldBounds = true;
}

function makeRainDrop(radius) {
  var graphics = game.add.graphics(10, 10);
  graphics.moveTo(10, 10);
  // graphics.lineStyle(1, 0xffffff, 0);
  // graphics.lineTo(width, 10);
  graphics.beginFill(0xB6DAFF);
  graphics.drawCircle(50,50,radius);
  graphics.endFill();
  txt = graphics.generateTexture();
  graphics.destroy();
  return txt;
  // var s = game.add.sprite(x, y, txt);
  // game.physics.arcade.enable(s);
  // s.body.immovable = true;
  // return s;
}
