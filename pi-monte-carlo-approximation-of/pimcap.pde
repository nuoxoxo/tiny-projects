void  setup()
{
  size(550, 550);
}

void  draw()
{
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(0, 0, 512, 512);
  rectMode(CENTER);
  rect(0, 0, 512, 512);
}
