// LESSON ONE
// Show the key pressed in the console
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
function keyPressed(letter) {
  game.world.removeAll();
  var sprite = drawLetterOnScreen(letter);
  dropSprite(sprite);
}



// LESSON FIVE
// Move the letter to a random spot after it falls off the screen
// Stop clearing the screen to allow multiple letters
function keyPressed(letter) {
  var sprite = drawLetterOnScreen(letter);
  dropSprite(sprite);
}
function outOfBounds(sprite) {
    sprite.x = game.rnd.integerInRange(10, 700);
    sprite.y = 100;
}
