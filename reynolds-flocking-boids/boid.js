class   Boid
{
    constructor()
    {
        this.P = createVector(width / 2, height / 2)
        this.V = createVector()
        this.A = createVector()
    }

    show()
    {
        strokeWeight(16)
        stroke(255)
        point(this.P.x, this.P.y)
    }
}
