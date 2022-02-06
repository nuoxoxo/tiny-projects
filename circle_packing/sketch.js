let circles
let spots
let img
const HL = Math.round(Math.random() * (180 - 10)) + 10
const HR = Math.round(Math.random() * (350 - HL)) + HL

function preload(){ img = loadImage("hu.png") }


function setup()
{


    img.loadPixels()
    createCanvas(img.width, img.height)
    colorMode(HSB)

    console.log(HL, HR)

    circles = []
    spots = []
    let x = -1
    while (++x < img.width)
    {
        let y = -1
        while (++y < img.height)
        {
            let index = x + y * img.width
            let c = img.pixels[index * 4]
            let b = brightness(c)

            if (b > 1)  spots.push(createVector(x, y))
        }
    }
}


function draw()
{
    background(0)

    let total = 5, count = 0, trial = 0;

    while (count < total)
    {
        let c = newCircle()

        if (c)  circles.push(c), count++
        trial++
        if (trial > 1000)
        {
            noLoop()
            break
        }
    }
    for (var c of circles)
    {
        if (c.growing)
        {
            if (c.edge())
		c.growing = false
            else
            {
                for (var o of circles)
                {
                    if (o ^ c)
                    {
                        let d = dist(c.x, c.y, o.x, o.y)
                        if (d - 4 < c.r + o.r)
                        {
                            c.growing = false
                            break
                        }
                    }
                }
            }
        }
        c.show()
        c.grow()
    }
}


function newCircle()
{
    let r = int(random(0, spots.length))
    let x = spots[r].x;
    let y = spots[r].y
    let ok = true
    let i = -1

    while (++i < circles.length)
    {
        let c = circles[i]
        let d = dist(x, y, c.x, c.y)
        if (d < c.r)
        {
            ok = false
            break
        }
    }
    if (ok) return new Circle(x, y)
    else    return null
}


class Circle
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
        this.r = 2

        this.H = random(HL, HR)
        //this.S = random(80, 100)
        this.S = 100
        //this.S = random(80, 100)
        this.B = 100

        this.growing = true
    }

    grow()
    {
        if (this.growing && this.r < 12)
	    this.r += 2
    }

    show()
    {
        //noStroke()
        stroke(1)
        let cmode = color(this.H, this.S, this.B, 50)
        fill(cmode)
        ellipse(this.x, this.y, this.r * 2, this.r * 2)
    }

    edge()
    {
        return(
            this.x + this.r > width ||
            this.y + this.r > height ||
            this.x - this.r < 0 ||
            this.y - this.r < 0
        )
    }
}
