// bg image source: http://www.timvandevall.com/pirate-printables/pirate-treasure-maps/
function preload() {
  game.load.image('bg', 'img/treasure/bg.jpg');
  game.load.image('hat', 'img/treasure/hat.png');
  game.load.image('sail', 'img/treasure/sail.png');
  game.load.image('skull', 'img/treasure/skull.png');
  game.load.image('tower', 'img/treasure/tower.png');
  game.load.image('treasure', 'img/treasure/treasure.png');
}

function drawItems() {
  game.add.image(665,200,'hat');
  game.add.image(150,413,'sail');
  game.add.image(209,200,'skull');
  game.add.image(340,70,'tower');
  game.add.image(505,284,'treasure');
}

function create() {
  var bg = game.add.image(0,0,'bg');
  drawItems()
}
