function preload() {
  game.input.keyboard.addCallbacks(this, function(event) {
    var letter = String.fromCharCode(event.keyCode || event.which).toUpperCase();
    keyPressed(letter);
  });
}

function drawLetterOnScreen(letter) {
  var text = game.add.text(game.world.centerX, game.world.centerY, letter);
  text.anchor.set(0.5);
  text.fontSize = 50;
  text.fill = "#ffffff";
  return text;
}

function dropSprite(sprite) {
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  sprite.enableBody = true;
  sprite.body.velocity.y = 20;
  sprite.checkWorldBounds = true;
  sprite.events.onOutOfBounds.add(function(sprite) {
    console.log("out of bounds", sprite)
  }, this);
}


// LESSON ONE
// Get the letter from the event, and show it in the console
function keyPressed(letter) {
  console.log(letter);
}

// LESSON TWO
// Draw the letter to the screen
function keyPressed(letter) {
  drawLetterOnScreen(letter);
}

// LESSON THREE
// Clear the screen between drawing each letter
function keyPressed(letter) {
  game.world.removeAll();
  drawLetterOnScreen(letter);
}

// LESSON FOUR
// Drop the letter downward
// describe a sprite
function keyPressed(letter) {
  game.world.removeAll();
  var sprite = drawLetterOnScreen(letter);
  dropSprite(sprite);
}
