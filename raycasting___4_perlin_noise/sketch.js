let bound
let bounds = []
let particle

let	x_offset = 0
let	y_offset = 1000

/*//
640×480		1024×768	1280×720	1280×800
1280×1024	1440×900	1600×1200	1920×1080
1920×1200	2048×1080	3840×2160	4096×2160	*/

X = 1280
Y = 1024

function setup() {
	createCanvas(X, Y);
	let w = width
	let h = height
	
	// 	Add surfaces

	let i = -1
	while (++i < 6) {
		bounds.push(new Bound(
			random(width), random(width), 
			random(height), random(height), false
		))
	}

	//	Add walls/frame

	bounds.push(new Bound(0, 0, width, 0, true))
	bounds.push(new Bound(width, 0, width, height, true))
	bounds.push(new Bound(width, height, 0, height, true))
	bounds.push(new Bound(0, height, 0, 0, true))

	particle = new Particle()
}

function draw() {
	background(0);

	for (let b of bounds) {
		b.show()
	}

	//	Perlin noise

	particle.update(noise(x_offset) * width, noise(y_offset) * height)
	x_offset += 0.01
	y_offset += 0.01

	//	Mouse tracking

	//particle.update(mouseX, mouseY)

	//	Draw dot & light beams (common)

	particle.show()
	particle.look(bounds)
}

//  	Class Bound

class Bound
{
	constructor(x1, y1, x2, y2, isFrame) {
		this.a = createVector(x1, y1)
		this.b = createVector(x2, y2)
		this.isFrame = isFrame
	}

	show() {
		if (this.isFrame == true)
			stroke(0)
		else
			stroke(255)
		line(this.a.x, this.a.y, this.b.x, this.b.y)
	}
}

//  	Class Ray

class Ray
{
	constructor(pos, angle) {
		this.pos = pos
		this.dir = p5.Vector.fromAngle(angle)
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
		line(0, 0, this.dir.x * 10, this.dir.y * 10)
		pop()
	}

	where_to_look(x, y) {
		this.dir.x = x - this.pos.x
		this.dir.y = y - this.pos.y
		this.dir.normalize()
	}

}

//	Class Particle

class Particle {
	constructor() {
		this.pos = createVector(width / 2, height / 2)
		this.rays = []
		let i = 0
		while (i < 360) {
			this.rays.push(new Ray(this.pos, radians(i)))
			i += 3
		}
	}

	show () {
		fill(255)
		ellipse(this.pos.x, this.pos.y, 8)
		for (let ray of this.rays) {
			ray.show()
		}
	}

	look(bounds) {
		for (let ray of this.rays) {
			let closest_dist = Infinity
			let closest_pt = null
			for (let b of bounds) {
				const pt = ray.cast(b)
				if (pt) {
					const dist = p5.Vector.dist(this.pos, pt)
					if (dist < closest_dist) {
						closest_dist = dist
						closest_pt = pt
					}
				}
			}
			if (closest_pt) {
				line(this.pos.x, this.pos.y, 
					closest_pt.x, closest_pt.y
				)
			}
		}
	}

	update(x, y) {
		this.pos.set(x, y)
	}
}
