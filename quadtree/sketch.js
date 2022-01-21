let tree;

function setup(){
  createCanvas(800, 800);

  let boundary = new Rectangle(400,400,400,400);
  tree = new Quadtree(boundary, 4);
  console.log(tree)

  for (let i = 0; i < 640; i++){
    let p = new Point(random(width), random(height));
    tree.insert(p);
  }

  background(0);
  tree.show();

}
