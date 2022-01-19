int  S = 720;
int  os = 0; // offset
int  alfa = 100;

void  setup()
{
  size(729, 729); // variable forbidden // 729 = 27^2 = 9^3 = 3^6
  background(0);
  translate(width / 2, height / 2);
  stroke(255, alfa);
  strokeWeight(3);
  noFill();
  ellipse(0, 0, S, S);
  //rectMode(CENTER);
  //rect(0, 0, S, S);
}

double  bestPi = 0;   
float  r = S / 2;
int  dots = 0;
int  include = 0;
int  iterate = 512;

void  draw()
{
  translate(width / 2, height / 2);
  for (int i = 0; i < iterate; i++)
  {
    dots += iterate;
    float x = random(-r, r);
    float y = random(-r, r);
    double d = (double) x * (double) x + (double) y * (double) y;
    if (d < (double) r * (double) r)
    {
      include += iterate;
      stroke(random(0, 160), 0, random(0, 250), alfa);
    } else  noStroke();
    strokeWeight(4);
    point(x, y);

    double currPi = (double) include / (double) dots * (double) 4;
    double precision = Math.abs(Math.PI - bestPi);
    double temp = Math.abs(Math.PI - currPi);
    if (precision > temp)
    {
      precision = temp;
      bestPi = currPi;
      double percentage = (double) (Math.abs(Math.PI - precision) / Math.PI * 100);
      println("Precision: " + percentage + "% - Best Pi: " + bestPi);
    }
  }
}
