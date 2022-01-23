class Point {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Rectangle{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point){
    return (point.x > this.x - this.w &&
    point.x < this.x + this.w &&
    point.y > this.y - this.h &&
    point.y < this.y + this.h);
  }
}

class Quadtree{
  constructor(b, c){
    this.boundary = b;
    this.capacity = c;
    this.points = [];
    this.divided = false;
  }

  subdivide(){
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.nw = new Quadtree(nw, this.capacity);
    this.ne = new Quadtree(ne, this.capacity);
    this.se = new Quadtree(se, this.capacity);
    this.sw = new Quadtree(sw, this.capacity);

    this.divided = true;
  }

  insert(point){

    if(!this.boundary.contains(point)){
      return;
    }

    if (this.points.length < this.capacity){
        this.points.push(point);
    } else {
      if (!this.divided){
        this.subdivide();
      }

      this.ne.insert(point);
      this.nw.insert(point);
      this.se.insert(point);
      this.sw.insert(point);
    }
  }

  show(){
    noStroke();
    stroke(120);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(this.boundary.x,
      this.boundary.y,
      this.boundary.w * 2,
      this.boundary.h * 2);
    if (this.divided){
      this.ne.show();
      this.sw.show();
      this.se.show();
      this.nw.show();

    }
    for (let p of this.points){
      strokeWeight(2);
      point(p.x, p.y);

    }
  }
}
