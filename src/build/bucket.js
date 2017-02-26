var sprites = [];
var arrows, item, bucket, emitter, cloud;
var rainDirection = 1;
var rainSaved = 0;
var velocity = 10;
var rainAmount = 100;
var rainLifespan = 1000;
var rainDrop;
var GameScoreText;
var splashEmitter;

function bucketCollide(bucket, particle) {
  rainSaved += 1;
  // particle.destroy();
  particle.visible = false;
  GameScoreText.text = scoreText();
  splashEmitter.x = bucket.x + 60;
  splashEmitter.y = bucket.y;
  splashEmitter.explode(100, 200);
}

function scoreText() {
  return "Rain Saved: " + rainSaved
}

function drawScore() {
  GameScoreText = game.add.text(10, 10, scoreText());
  GameScoreText.fill = "#999999";
  GameScoreText.fontSize = 14;
}

function update() {
  if (arrows.right.isDown) {
    bucket.x += velocity;
  }
  if (arrows.left.isDown) {
    bucket.x -= velocity;
  }
  // if (arrows.up.isDown) {
  //   bucket.y -= 1
  // }
  // if (arrows.down.isDown) {
  //   bucket.y += 1
  // }

  game.physics.arcade.collide(emitter, bucket, bucketCollide);

  if (emitter.x + 50 > game.world.width) {
    rainDirection = -1;
  } else if (emitter.x + 50 < 0) {
    rainDirection = 1;
  }
  emitter.x = emitter.x + rainDirection;
  cloud.x += rainDirection;
}

function preload() {
  game.load.image('bucket', 'img/bucket.png');
  game.load.image("cloud", "img/cloud.png");
  var rainDrop = makeRainDrop();
  emitter = game.add.emitter(game.world.centerX, 60, rainAmount);
  emitter.width = 200;
  emitter.makeParticles(rainDrop, 0, emitter.maxParticles, true, false);
  emitter.gravity = 600;
  emitter.minParticleScale = 1;
  emitter.maxParticleScale = 1;
  emitter.setXSpeed(0,5);
  emitter.setYSpeed(450, 600);
  emitter.start(false, rainLifespan, 10);

  splashEmitter = game.add.emitter(0, 0, 10);
  splashEmitter.width = 50;
  splashEmitter.makeParticles(rainDrop, 0);
  splashEmitter.minParticleScale = 0.3;
  splashEmitter.maxParticleScale = 0.45;
  splashEmitter.setYSpeed(-150, 200);
  splashEmitter.setXSpeed(-150, 200);

  arrows = game.input.keyboard.createCursorKeys();
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  bucket = game.add.sprite(30, 480, 'bucket')
  cloud = game.add.sprite(emitter.x - 100, 0, "cloud");
  game.physics.arcade.enable(bucket);
  // bucket.body.bounce.set(0);
  bucket.body.collideWorldBounds = true;
  bucket.body.immovable = true;
  game.physics.arcade.enable(emitter);
  drawScore()
  // emitter.body.bounce.set(0);
  // emitter.body.mass = 0;
  // rainDrop.body.mass = 0;

  // emitter.body.collideWorldBounds = true;
}

function makeRainDrop() {
  var graphics = game.add.graphics(10, 10);
  graphics.moveTo(10, 10);
  // graphics.lineStyle(1, 0xffffff, 0);
  // graphics.lineTo(width, 10);
  graphics.beginFill(0xB6DAFF);
  graphics.drawCircle(50,50,10);
  graphics.endFill();
  txt = graphics.generateTexture();
  graphics.destroy();
  return txt;
  // var s = game.add.sprite(x, y, txt);
  // game.physics.arcade.enable(s);
  // s.body.immovable = true;
  // return s;
}
