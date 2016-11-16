// LESSON ONE
// draw two eyes and a mouth
function drawFace() {
  // eyes
  draw("O", 300, 140);
  draw("O", 400, 140);
  // mouth
  draw("O", 350, 310);
}

// LESSON TWO
// add a nose
function drawFace() {
  // eyes
  draw("O", 300, 140);
  draw("O", 400, 140);

  // nose
  draw(">", 360, 210);

  // mouth
  draw("O", 350, 310);
}

// LESSON THREE
// use stars for the mouth
// make a simple smile
function drawFace() {
  // eyes
  draw("O", 300, 140);
  draw("O", 400, 140);

  // nose
  draw(">", 360, 210);

  // mouth
  draw("*", 300, 300);
  draw("*", 350, 310);
  draw("*", 400, 300);
}

// LESSON FOUR
// make a wider smile
function drawFace() {
  // eyes
  draw("O", 300, 140);
  draw("O", 400, 140);

  // nose
  draw(">", 360, 210);

  // mouth
  draw("*", 265, 270);
  draw("*", 300, 300);
  draw("*", 350, 310);
  draw("*", 400, 300);
  draw("*", 435, 270);
}

// LESSON FIVE
// make the eyes blink
function drawFace() {
  // eyes
  leftEye = draw("O", 300, 140);
  rightEye = draw("O", 400, 140);
  blink(leftEye, "^", 200);
  blink(rightEye, "^", 200);

  // nose
  draw(">", 360, 210);

  // mouth
  draw("*", 265, 270);
  draw("*", 300, 300);
  draw("*", 350, 310);
  draw("*", 400, 300);
  draw("*", 435, 270);
}

// LESSON SIX
// draw a border around the face
function drawFace() {
  // eyes
  leftEye = draw("O", 300, 140);
  rightEye = draw("O", 400, 140);
  blink(leftEye, "^", 200);
  blink(rightEye, "^", 200);

  // nose
  draw(">", 360, 210);

  // mouth
  draw("*", 265, 270);
  draw("*", 300, 300);
  draw("*", 350, 310);
  draw("*", 400, 300);
  draw("*", 435, 270);

  // border
  drawHorizontal("-", 180, 550, 50, 20);
  drawHorizontal("-", 180, 550, 400, 20);
  drawVertical("|", 88, 400, 180, 55);
  drawVertical("|", 88, 400, 543, 55);
}
