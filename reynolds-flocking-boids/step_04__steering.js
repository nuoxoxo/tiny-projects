const   flock = []

function    setup()
{
    createCanvas(1024, 768)
    for (let i = 0; i < 256; i++)   flock.push(new Boid())
}

function    draw()
{
    background(16)
    let flock_copy = [...flock]

    /*
    for (let boid of flock)
    {
        boid.flock(flock)
        boid.update()
        boid.show()
    }
    */
    for (let i = 0; i < flock.length; i++)
    {
        flock[i].flock(flock_copy)
        flock[i].update()
        flock[i].show()
    }
}

class   Boid
{
    constructor()
    {
        this.position = createVector(random(width), random(height))
        this.velocity = p5.Vector.random2D()
        this.velocity.setMag(random(4, 16))
        this.acceleration = createVector()
    }

    flock(boids)
    {
        let alignment= this.align(boids)
        this.acceleration = alignment
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
            steering.sub(this.velocity)
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
}
