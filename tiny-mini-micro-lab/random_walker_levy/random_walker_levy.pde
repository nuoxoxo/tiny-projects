PVector  curr;
PVector  prev;
float    prevr;
int      offset = 8;

void  setup()
{
  size(720, 720) ;
  background(0);
  curr = new PVector(width / 2, height / 2);
  prev = curr.copy();
}

void  draw()
{
  if (curr.x < offset || curr.x > width - offset
    || curr.y < offset || curr.y > height - offset)
    noLoop();

  PVector  step = PVector.random2D();
  float    r = random(100);

  if (r < 1)
  {
    step.mult(random(25, 100));
  }
  else
  {
    step.setMag(4);
    stroke(255);
    strokeWeight(2);
    if (prevr >= 1)  line(curr.x, curr.y, prev.x, prev.y);
  }
  prevr = r ;
  prev.set(curr);
  curr.add(step);
}
