// bg image source: https://www.scbwi.org/wp-content/uploads/2016/06/november-snow-original.png
function preload() {
  game.load.image('flake1', 'img/flake1.png');
  game.load.image('flake2', 'img/flake2.png');
  game.load.image('flake3', 'img/flake3.png');
  game.load.image('bg', 'img/snow-bg.png');
}

var ground;
var emitter;
function create() {
  // game.physics.startSystem(Phaser.Physics.ARCADE);
  var bg = game.add.image(0,0,'bg');
  ground = makeGround(0, 550, 800);

  emitter = game.add.emitter(game.world.centerX, 0, 500);
  // emitter.enableBody = true;
  emitter.width = 800;
  emitter.makeParticles(['flake1', 'flake2', 'flake3'], 0, emitter.maxParticles, true, false);
  emitter.gravity = 10;
  emitter.minParticleScale = 0.1;
  emitter.maxParticleScale = 0.3;
  emitter.setRotation(20, 40);
  emitter.start(false, 9000, 30);
  // game.physics.arcade.enable(emitter);
  // ground.body.collide(emitter);
}

function update() {
  game.physics.arcade.collide(emitter, ground);
}

function makeGround(x, y, width) {
  var graphics = game.add.graphics(0, 10);
  graphics.moveTo(0, 10);
  graphics.lineStyle(1, 0xffffff, 0);
  graphics.lineTo(width, 10);
  txt = graphics.generateTexture();
  graphics.destroy();
  var s = game.add.sprite(x, y, txt);
  game.physics.arcade.enable(s);
  s.body.immovable = true;
  return s;
}
