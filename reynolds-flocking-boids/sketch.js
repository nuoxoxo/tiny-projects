const   flock = [];

function    setup()
{
    createCanvas(1024, 768)
    flock.push(new Boid());
}

function    draw()
{
    background(16)
    for (let boid of flock)
    {
        boid.show()
    }
}
