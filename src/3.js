
function preload() {
  drawHorizontal("-", 180, 550, 50, 20);
  drawHorizontal("-", 180, 550, 400, 20);
  drawVertical("|", 88, 400, 180, 55);
  drawVertical("|", 88, 400, 543, 55);
  leftEye = drawLetterOnScreen("O", 300, 140);
  rightEye = drawLetterOnScreen("O", 400, 140);
  blink(leftEye, "^", 200);
  blink(rightEye, "^", 200);
  drawLetterOnScreen(">", 360, 210);
  drawLetterOnScreen("*", 265, 270);
  drawLetterOnScreen("*", 300, 300);
  drawLetterOnScreen("*", 350, 310);
  drawLetterOnScreen("*", 400, 300);
  drawLetterOnScreen("*", 435, 270);

}

function blink(sprite, character, duration, start) {
  start = start || 2000;
  var timer = game.time.create(false);
  timer.loop(start,
    function() {
      timer.pause();
      var oldText = sprite.text;
      sprite.text = character;
      var newTimer = game.time.create(true);
      newTimer.add(duration, function() {
        sprite.text = oldText;
        timer.resume();
      },
      this);
      newTimer.start();
    },
  this);
  timer.start();
}

function drawHorizontal(letter, start, end, y, step) {
  for (var i = start; i < end; i+= step) {
    drawLetterOnScreen(letter, i, y);
  }
}

function drawVertical(letter, start, end, x, step) {
  for (var i = start; i < end; i+= step) {
    drawLetterOnScreen(letter, x, i);
  }
}
