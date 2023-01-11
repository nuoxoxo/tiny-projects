// area of a triangle
// abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0

let offset = 100
let textSz = 20
let isFloat = true
let isInt = false

function setup() {
  createCanvas(720, 720);
  let W = width - offset, H = height - offset
  let S = 0
  while (S < 60000) {
    ax = random() * W
    ay = random() * H
    bx = random() * W
    by = random() * H
    cx = random() * W
    cy = random() * H
    S = abs(ax*(by-cy) + bx*(cy-ay) + cx*(ay-by)) / 2.0
  }
  console.log('(%f, %f)', ax, ay)
  console.log('(%f, %f)', bx, by)
  console.log('(%f, %f)', cx, cy)  
}

function draw() {
  background(0);
  triangle(ax, ay, bx, by, cx, cy)
  fill(color('white'))
  print_coor(ax, ay, isFloat);
  print_coor(bx, by, isFloat);
  print_coor(cx, cy, isFloat);
  print_coor(mouseX, mouseY, isInt)
  let result = check_in(mouseX, mouseY, ax, ay, bx, by, cx, cy)
  if (result) {
    fill(color('green'))
  } else {
    fill(color('red'))
  }
}

function check_in(Px,Py,x1,y1,x2,y2,x3,y3) {
  let sign_1 = get_sign(x1, y1, x2, y2, Px, Py)
  let sign_2 = get_sign(x2, y2, x3, y3, Px, Py)
  let sign_3 = get_sign(x3, y3, x1, y1, Px, Py)
  if (sign_1 == 0 || sign_2 == 0 || sign_3 == 0)
    return false
  let has_same_sign = (
    (sign_1 < 0 && sign_2 < 0 && sign_3 < 0) || 
    (sign_1 > 0 && sign_2 > 0 && sign_3 > 0)
  )
  // console.log(sign_1, sign_2, sign_3)
  return has_same_sign
}
  
function get_sign(x1,y1,x2,y2,X,Y) {
  return ((x1 - X) * (y2 - Y)) - ((x2 - X) * (y1 - Y))
}

// text printer

function print_coor(x, y, isFloat) {
  if (isFloat) {
    a = x.toFixed(4)
    b = y.toFixed(4)
  } else {
    a = x
    b = y
  }
  textSize(textSz);
  fill(255);
  // text("("+ a + ", " + b + ")", a, b)
  if (isFloat) {
    text(a, parseInt(a), parseInt(b))
    text(b, parseInt(a), parseInt(b) + textSz)
  } else {
    text(a, parseInt(a) + textSz, parseInt(b))
    text(b, parseInt(a) + textSz, parseInt(b) + textSz)
  }
}