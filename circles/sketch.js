var L = 1e4;

function drawCircles() {
  var circles = [];
  var limit = L;

  while (circles.length < 500 && limit > -1) {
    var circle = {
      x: random(width),
      y: random(height),
      r: random(random(2, 7), 64),
    };
    let overlapped = false;
    for (let other of circles)
      if (circle.r + other.r > dist(circle.x, circle.y, other.x, other.y))
        overlapped = true;
    if (!overlapped) circles.push(circle);
    limit--;
  }
  for (let c of circles) {
    fill(random(128, 228), random(220, 255), random(214, 209), 190);
    noStroke();
    ellipse(c.x, c.y, c.r * 2, c.r * 2);
  }
}

function setup() {
  createCanvas(720, 720);
  //background(0);
  //drawCircles();
}

function draw() {
  background(0);
  drawCircles();
}
