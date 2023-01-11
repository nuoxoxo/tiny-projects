let bound
let r

function setup() {
	createCanvas(400, 400);
	bound = new Bound(300, 100, 300, 300)
	ray = new Ray(100, 200)
}

function draw() {
	background(0);
	bound.show()
	ray.show()
	ray.where_to_look(mouseX, mouseY)

	let p = ray.cast(bound)
	if (p) {
		fill(255)
		ellipse(p.x, p.y, 16, 16)
	}
	// console.log(p)
}

//  Bound

class Bound
{
	constructor(x1, y1, x2, y2) {
		this.a = createVector(x1, y1)
		this.b = createVector(x2, y2)
	}

	show() {
		stroke(255)
		line(this.a.x, this.a.y, this.b.x, this.b.y)
	}
}

//  Ray

class Ray
{
	constructor(x, y) {
		this.pos = createVector(x, y)
		this.dir = createVector(1, 0)
	}

	cast (bound) {
		const x1 = bound.a.x
		const y1 = bound.a.y

		const x2 = bound.b.x
		const y2 = bound.b.y

		const x3 = this.pos.x
		const y3 = this.pos.y

		const x4 = this.pos.x + this.dir.x
		const y4 = this.pos.y + this.dir.y

		const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

		if (denom == 0)
			return

		const numer_t = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)
		const numer_u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3))
		const t = numer_t / denom
		const u = numer_u / denom

		if (t < 1 && t > 0 && u > 0) {
			const pt = createVector()
			pt.x = x1 + t * (x2 - x1)
			pt.y = y1 + t * (y2 - y1)
			return pt
		} else {
			return
		}
	}

	show() {
		stroke(255)
		push()
		translate(this.pos.x, this.pos.y)
		line(0, 0, this.dir.x * 10,
		this.dir.y * 10)
		pop()
	}

	where_to_look(x, y) {
		this.dir.x = x - this.pos.x
		this.dir.y = y - this.pos.y
		this.dir.normalize()
	}

}

class	Particle {

	//	Todo

}
