PVector  curr;
PVector  prev;

int      offset = 2;
int      moves = 100000;

//float    prevr;

void  setup()
{
  size(1000,1000) ;
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

  if (moves % 2000 == 0)
  {
    save("round.png");
    println(moves);
  }
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

  if (r < 2)
  {
    step.mult(random(25, width / 4));
  } else
  {
    step.setMag(2);

    //if (prevr >= 1)  line(curr.x, curr.y, prev.x, prev.y);
  }

  stroke(dist(curr.x, curr.y, width / 2, height / 2) / height * 360, 300, 300, 300);
  strokeWeight(2);
  if (!w)  line(curr.x, curr.y, prev.x, prev.y);


  //if (!w && prevr >= 1)  line(curr.x, curr.y, prev.x, prev.y);

  //stroke(prev.x % 360, 360, 360, 360);
  //strokeWeight(2);
  //line(curr.x, curr.y, prev.x, prev.y);
  //prevr = r ;

  prev.set(curr);
  curr.add(step);
}
