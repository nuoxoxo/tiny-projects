const	perceptionRadius = 64
const   flock = []
const   size = 4
const   offset = size / 2 + 3
const   H = 120

function    setup()
{
    createCanvas(1024, 768)
    colorMode(HSB)
    for (let i = 0; i < 256; i++)   flock.push(new Boid())
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
        this.maxForce = 0.1 // gravity
        this.maxSpeed = 1
    }

    flock(boids)
    {
        //let alignment = this.align(boids)
        //let cohesion = this.cohere(boids)
        let separation = this.separate(boids)

        //this.acceleration.add(alignment) // changed from align_only
        //this.acceleration.add(cohesion) // diff from align_only
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
        stroke(255) // b&w
        stroke(H, this.position.x / width * 100, this.position.y / height * 300)
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
