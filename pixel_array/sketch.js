function setup()
{
	const	s = 50
	createCanvas(16*s, 9*s)
	pixelDensity(1)
}

function draw()
{
	background(0)
	loadPixels()

	let	x = -1;
	while (++x < height)
	{
		let y = -1;
		while (++y < width)
		{
			let i = 4 * (y + x * width)
			pixels[i + 0] = y
			pixels[i + 1] = random(255)
			//pixels[i + 1] = 0
			pixels[i + 2] = x
			pixels[i + 3] = 255
			//pixels[i + 3] = y * 2 % x
		}
	}
	updatePixels();
}
