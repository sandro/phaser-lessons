// bg image source: http://www.timvandevall.com/pirate-printables/pirate-treasure-maps/

var sprites = [];
var arrows, item;

function update() {
  if (arrows.right.isDown) {
    item.x += 1
  } else if (arrows.left.isDown) {
    item.x -= 1
  } else if (arrows.up.isDown) {
    item.y -= 1
  } else if (arrows.down.isDown) {
    item.y += 1
  }
}

function selectCurrentObject(event) {
  var index = Number.parseInt(String.fromCharCode(event.keyCode));
  item = sprites[index - 1];
}

function preload() {
  game.load.image('bg', 'img/treasure/bg.jpg');
  game.load.image('hat', 'img/treasure/hat.png');
  game.load.image('sail', 'img/treasure/sail.png');
  game.load.image('skull', 'img/treasure/skull.png');
  game.load.image('tower', 'img/treasure/tower.png');
  game.load.image('treasure', 'img/treasure/treasure.png');

  arrows = game.input.keyboard.createCursorKeys();

  game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(selectCurrentObject);
  game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(selectCurrentObject);
  game.input.keyboard.addKey(Phaser.Keyboard.THREE).onDown.add(selectCurrentObject);
  game.input.keyboard.addKey(Phaser.Keyboard.FOUR).onDown.add(selectCurrentObject);
  game.input.keyboard.addKey(Phaser.Keyboard.FIVE).onDown.add(selectCurrentObject);
}

function drawItems() {
  sprites.push(game.add.sprite(665,200,'hat'));
  sprites.push(game.add.sprite(150,413,'sail'));
  sprites.push(game.add.sprite(209,200,'skull'));
  sprites.push(game.add.sprite(340,70,'tower'));
  sprites.push(game.add.sprite(505,284,'treasure'));
  item = sprites[0];
}

function create() {
  var bg = game.add.image(0,0,'bg');
  drawItems()
}
