class	Board
{
	constructor(x1, y1, x2, y2)
	{
		this.a = createVector(x1, y1)
		this.b = createVector(x2, y2)
	}

	show()
	{
		stroke(255)
		line(this.a.x, this.a.y, this.b.x, this.b.y)
	}
}

class	Light
{
	constructor(x, y)
	{
		this.pos = createVector(x, y)
		this.dir = createVector(1, 0)

	}

	show()
	{
		stroke(255)
		push()
		translate(this.pos.x, this.pos.y)
		line(0, 0, this.dir.x * 10, this.dir.y * 10)
		pop()
	}
}

//	Drive

let	b;
let	l;

function setup() {
	createCanvas(400, 400)
	b = new Board(300, 100, 100, 300)
	l = new Light(100, 200)
}

function draw() {
	background(0)
	b.show()
	l.show()
}
