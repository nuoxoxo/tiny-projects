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
