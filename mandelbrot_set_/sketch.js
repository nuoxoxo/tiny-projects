function setup()
{
	createCanvas(720, 720)
	noStroke()
	colorMode(HSB)
	draw_brot()
}


let centerX = 0
let centerY = 0
let scale = 1


function draw()
{
	let reset = false


	if (keyIsDown(87))	reset = true, centerY -= 0.5 / scale
	if (keyIsDown(83))	reset = true, centerY += 0.5 / scale
	if (keyIsDown(65))	reset = true, centerX -= 0.5 / scale
	if (keyIsDown(68))	reset = true, centerX += 0.5 / scale
	if (keyIsDown(74))	reset = true, scale += scale * 0.5
	if (keyIsDown(75))	reset = true, scale -= scale * 0.5
	if (reset)		draw_brot()
}


function draw_brot()
{
	for (let x = 0; x < width; x++)
	{
		for (let y = 0; y < height; y++)
		{
			let c = pixel_to_point(x, y)
			let result = calculate_point(c)

			if (result.inside)
			{
				set(x, y, color(0))
			}
			else if (result.i > 1)
			{
				let factor = pow(result.i / (64), 0.5) * 200 % 255
				set(x, y, color(256 - factor, 100, 64))
			}
			else
			{
				set(x, y, color(0))
			}
		}
	}
	updatePixels();
}


function pixel_to_point(x, y)
{
	return createVector(
		(x - width/2) * (4/width) * (width/(height*scale)) + centerX,
		(y - height/2) * (4/height) * (1/scale) + centerY
	)
}


function calculate_point( c )
{
	let z0 = createVector(0, 0)
	let inside = true
	let bound = 2
	let i = -1

	while (++i < 128 && inside)
	{
		let a = z0.x
		let b = z0.y
		let x = c.x + a * a - b * b
		let y = c.y + 2 * a * b
		z0 = createVector(x, y)
		if (z0.mag() > bound)
		{
			inside = false
		}
	}
	return { 'i': i, 'inside': inside }
}
