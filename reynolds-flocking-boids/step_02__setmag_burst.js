const   flock = []

function    setup()
{
    createCanvas(1024, 768)
    for (let i = 0; i < 100; i++)   flock.push(new Boid())
}

function    draw()
{
    background(16)
    for (let boid of flock)
    {
        boid.update()
        boid.show()
    }
}

class   Boid
{
    constructor()
    {
        this.position = createVector(width / 2, height / 2)
        this.velocity = p5.Vector.random2D()
        this.velocity.setMag(random(0.2, 4))
        this.acceleration = createVector()
    }

    update()
    {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
    }

    show()
    {
        strokeWeight(16)
        stroke(255)
        point(this.position.x, this.position.y)
    }
}
