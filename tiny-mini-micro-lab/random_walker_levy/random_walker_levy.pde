PVector  curr;
PVector  prev;

int      offset = 2;
int      moves = 100000;

//float    prevr;

void  setup()
{
  size(720, 720) ;
  background(0);
  colorMode(HSB);
  curr = new PVector(width / 2, height / 2);
  prev = curr.copy();
}

void  draw()
{
  //if (curr.x < offset || curr.x > width - offset
  //  || curr.y < offset || curr.y > height - offset)
  //  noLoop();
  moves-- ;

  if (moves % 1000 == 0)  println(moves);

  if (moves < 1)
  {
    save("walk.png");
    noLoop() ;
  }

  boolean  w = false ;

  if (curr.x < 0)
  {
    w = true;
    curr.x += width;
  } else if (curr.x > width - 1)
  {
    w = true;
    curr.x -= width;
  }
  if (curr.y < 0)
  {
    w = true; 
    curr.y += height;
  } else if (curr.y > height - 1)
  {
    w = true; 
    curr.y -= height;
  }
  PVector  step = PVector.random2D();
  float    r = random(100);

  if (r < 1)
  {
    step.mult(random(25, 100));
  } else
  {
    step.setMag(4);
    stroke(prev.x % 330, 360, 360, 360);
    strokeWeight(2);
    //if (prevr >= 1)  line(curr.x, curr.y, prev.x, prev.y);
  }

  //if (!w && prevr >= 1)  line(curr.x, curr.y, prev.x, prev.y);

  if (!w)  line(curr.x, curr.y, prev.x, prev.y);

  //stroke(prev.x % 360, 360, 360, 360);
  //strokeWeight(2);
  //line(curr.x, curr.y, prev.x, prev.y);
  //prevr = r ;

  prev.set(curr);
  curr.add(step);
}
