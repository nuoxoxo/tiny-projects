const   flock = []

function    setup()
{
    createCanvas(1024, 768)
    for (let i = 0; i < 16; i++)   flock.push(new Boid())
}

function    draw()
{
    background(8)
    for (let boid of flock)
    {
        boid.wrap()
        boid.flock(flock)
        boid.update()
        boid.show()
    }
}

class   Boid
{
    constructor()
    {
        this.position = createVector(random(width), random(height))
        this.velocity = p5.Vector.random2D()
        this.velocity.setMag(random(2, 4))
        this.acceleration = createVector()
        this.maxForce = 0.2 // gravity
        this.maxSpeed = 2
    }

    flock(boids)
    {
        //let alignment = this.align(boids)
        let cohesion = this.cohere(boids)
        //this.acceleration = alignment
        this.acceleration = cohesion
    }

    cohere(boids)
    {
        let total = 0
        let perceptionRadius = 64
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
            //steering.setMag(this.maxSpeed)
            steering.sub(this.velocity)
            steering.limit(this.maxForce)
        }
        return steering
    }

    align(boids)
    {
        let total = 0
        let perceptionRadius = 64
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

    update()
    {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
    }

    show()
    {
        strokeWeight(12)
        stroke(255)
        point(this.position.x, this.position.y)
    }

    wrap()
    {
        if (this.position.x > width)    this.position.x = 0
        else if (this.position.x < 0)   this.position.x = width
        if (this.position.y > height)   this.position.y = 0
        else if (this.position.y < 0)   this.position.y = height
    }
}
