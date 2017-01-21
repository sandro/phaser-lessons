var playerGravity = 600;
var jumpHeight = 300;
var speed = 150;
var mapUnit = 100;
var map = [6,null,3,null,3,null,null,6,null,1,null,2,null,3,null,2,null,8]
var mapSprites = [];
var player;
var jumpButton;

function render() {
  game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
}

function preload() {
  game.time.advancedTiming = true;
  buildMap()
}

function playerJump() {
  if (jumpButton.isDown && player.body.touching.down) {
    player.body.velocity.y = -jumpHeight;
    player.body.gravity.y = playerGravity * 0.5;
  }
  if (jumpButton.isUp) {
    player.body.gravity.y = playerGravity;
  }
}

function playerLost(sprite) {
  console.log("sprite", sprite, sprite.y, game.world.height);
  if (sprite.y > game.world.height) {
    game.debug.text("game over", 2, 40, "#ff0000");
    game.physics.arcade.isPaused = true;
  }
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  player = buildPlayer();
  player.checkWorldBounds = true;
  player.events.onOutOfBounds.add(playerLost);
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  jumpButton.onDown.add(playerJump);
}

function update() {
  game.physics.arcade.collide(player, mapSprites);
  player.body.x = game.world.centerX;
  playerJump();
}

function buildMap() {
  var leftMost = 0;
  for(var i=0; i < map.length; i++) {
    var width = map[i];
    if (width) {
      width = width * mapUnit;
      ground = makeGround(leftMost, 550, width);
      ground.body.velocity.x -= speed;
      mapSprites.push(ground);
      leftMost += width
    } else {
      leftMost += mapUnit;
    }
  }
}

function makeGround(x, y, width) {
  var graphics = game.add.graphics(0, 10);
  graphics.moveTo(0, 10);
  graphics.lineStyle(1, 0xffffff, 1);
  graphics.lineTo(width, 10);
  txt = graphics.generateTexture();
  graphics.destroy();
  var s = game.add.sprite(x, y, txt);
  game.physics.arcade.enable(s);
  s.body.immovable = true;
  return s;
}

function buildPlayer() {
  var s = game.add.sprite(game.world.centerX, 500, makeCircleTexture(0xff0000, 20));
  game.physics.arcade.enable(s)
  s.body.gravity.y = playerGravity;
  return s;
}

function makeCircleTexture(color, radius) {
  var graphics = game.add.graphics(0, 0);
  graphics.beginFill(color);
  graphics.drawCircle(100, 100, radius);
  graphics.endFill();
  var txt = graphics.generateTexture();
  graphics.destroy();
  return txt;
}



function blinkIt(s, t) {
  var timer = game.time.create();
  timer.loop(t, function() {
    timer.pause();
    s.alpha = 1;
    var newTimer = game.time.create();
    newTimer.add(200, function() {
      s.alpha = 0;
      timer.resume();
    });
    newTimer.start();
  });
  timer.start();
}

function drawSparkle(x, y, txt, duration) {
  var sp = game.add.sprite(x, y, txt);
  sp.alpha = 0;
  blinkIt(sp, duration);
}

function drawBulbs(y, red, green) {
  for (var i = 20; i < 800; i += 100) {
    var s = game.add.sprite(i, y, red);
    game.add.sprite(i + 50, y, green);
  }
}
