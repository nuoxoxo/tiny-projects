function setup() {
  createCanvas(640, 640);
}

function draw() {
	background(100)

	// Left circle

	noStroke()
	ellipse(0, height / 2, height / 3, height / 3)

	// Middle part

	push()

	stroke(16)
	strokeWeight(width / 10)
	fill(204, 153, 0)
	translate(width / 2, 0)
	ellipse(0, height / 2, width / 4, height / 4) // Vinyl

	pop() // Restore original state

	// Right circle

	ellipse(width, height / 2, height / 3, height / 3)
}
