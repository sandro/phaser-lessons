function preload() {
  game.load.image('flake1', 'img/flake1.png');
  game.load.image('flake2', 'img/flake2.png');
  game.load.image('flake3', 'img/flake3.png');
  game.load.image('bg', 'img/snow-bg.png');
}

function create() {
  var bg = game.add.image(0,0,'bg');

  emitter = game.add.emitter(game.world.centerX, 0, 500);
  emitter.width = 800;
  emitter.makeParticles(['flake1', 'flake2', 'flake3']);
  emitter.gravity = 10;
  emitter.minParticleScale = 0.1;
  emitter.maxParticleScale = 0.3;
  emitter.setRotation(20, 40);
  emitter.start(false, 9000, 30);
}
