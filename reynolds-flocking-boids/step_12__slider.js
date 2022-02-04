const	perceptionRadius = 64
const   flock = []
const   size = 16
const   offset = size / 2 + 3
const   H = 60
let pause = false

let as, cs, ss;

// 0    RED
// 30   ORANGE
// 60   YELLOW
// 120  GREEN
// 180  CYAN
// 240  BLUE
// 270  PURPLE
// 300  PINK
// 330  CHERRY

function    setup()
{
    createCanvas(990, 720)
    //createCanvas(1600, 900)
    //createCanvas(1024, 1024)
    as = createSlider(0, 2, 1, 0.1)
    cs = createSlider(0, 2, 1, 0.1)
    ss = createSlider(0, 2, 1, 0.1)
    colorMode(HSB)
    for (let i = 0; i < 300; i++)   flock.push(new Boid())
}

function    draw()
{
    background(8)

    let flockk = [...flock]

    if (!pause)
    {
        for (let f of flock)
        {
            f.wrap()
            f.flock(flockk)
            f.update()
            f.show()
        }
    }
}

function    keyPressed()
{
    if (key == 'p') pause = !pause
}

class   Boid
{
    constructor()
    {
        this.position = createVector(random(width), random(height))
        this.velocity = p5.Vector.random2D()
        this.velocity.setMag(random(2, 4))
        this.acceleration = createVector()
        this.maxForce = 0.6 // gravity
        this.maxSpeed = 1.6
        //this.S = this.position.x / width * 100
        //this.B = this.position.x / height * 100
        this.H = random(20, H)
        this.S = random(20, 41)
        this.B = random(20, 90)
    }

    flock(boids)
    {
        /*
        let alignment = this.align(boids)
        let cohesion = this.cohere(boids)
        let separation = this.separate(boids)
        */
        let alignment = this.align(boids).mult(as.value())
        let cohesion = this.cohere(boids).mult(cs.value())
        let separation = this.separate(boids).mult(ss.value())

        this.acceleration.add(alignment) // changed from align_only
        this.acceleration.add(cohesion) // diff from align_only
        this.acceleration.add(separation)
    }

    update()
    {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.acceleration.mult(0) // changed
    }

    show()
    {
        
        strokeWeight(size)
        //stroke(255) // b&w
        stroke(H, this.S, random(50, abs(100 - this.B)))
        point(this.position.x, this.position.y)

    }

    wrap()
    {
        if (this.position.x - offset > width)   this.position.x = -offset
        else if (this.position.x + offset < 0)  this.position.x = width + offset
        if (this.position.y - offset > height)  this.position.y = -offset
        else if (this.position.y + offset < 0)  this.position.y = height + offset
    }

    separate(boids)
    {
        let total = 0
        let steering = createVector()

        for (let other of boids)
        {
            let d = dist
            (
                other.position.x, other.position.y,
                this.position.x, this.position.y,
            )
            if (other != this && d < perceptionRadius)
            {
                let away = p5.Vector.sub(this.position, other.position)
                // away is a vector pointing away from the local flockmate `other`
                away.div(d) // the further the weaker the force, the closer the higher
                steering.add(away)
                total++
            }
        }
        if (total > 0)
        {
            steering.div(total)
            steering.setMag(this.maxSpeed)
            steering.sub(this.velocity)
            steering.limit(this.maxForce)
        }
        return steering
    }

    cohere(boids)
    {
        let total = 0
        let steering = createVector()

        for (let other of boids)
        {
            let d = dist
            (
                other.position.x, other.position.y,
                this.position.x, this.position.y,
            )
            if (other != this && d < perceptionRadius)
            {
                steering.add(other.position) // diff from align
                total++
            }
        }
        if (total > 0)
        {
            steering.div(total)
            steering.sub(this.position)
            steering.setMag(this.maxSpeed)
            steering.sub(this.velocity)
            steering.limit(this.maxForce)
        }
        return steering
    }

    align(boids)
    {
        let total = 0
        let steering = createVector()

        for (let other of boids)
        {
            let d = dist
            (
                other.position.x, other.position.y,
                this.position.x, this.position.y,
            )
            if (other != this && d < perceptionRadius)
            {
                steering.add(other.velocity)
                total++
            }
        }
        if (total > 0)
        {
            steering.div(total)
            steering.setMag(this.maxSpeed)
            // above line : to align, it depends on the direction-towards more than v
            steering.sub(this.velocity)
            steering.limit(this.maxForce)
        }
        return steering
    }
}
