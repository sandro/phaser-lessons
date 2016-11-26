function preload() {
  var sil = makeCircleTexture(0xffffff, 10);
  var red = makeCircleTexture(0xff0000, 25);
  var green = makeCircleTexture(0x00ff00, 25);

  drawBulbs(100, red, green);
  drawBulbs(150, red, green);
  drawBulbs(200, red, green);
  drawBulbs(250, red, green);
  drawBulbs(300, red, green);
  drawSparkle(100, 300, sil, 2000);
  drawSparkle(300, 100, sil, 1100);

  drawSparkle(500, 300, sil, 2200);
  drawSparkle(700, 100, sil, 700);
  drawSparkle(400, 250, sil, 2250);
  drawSparkle(375, 125, sil, 900);
  drawSparkle(25, 225, sil, 1000);
  drawSparkle(85, 180, sil, 700);
  drawSparkle(750, 300, sil, 925);
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
