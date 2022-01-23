var N = 1
var iterationLimit = 1e4 * N

function drawCircles()
{
    var circles = []
    var limit = iterationLimit

    //while (circles.length < 8196 && limit > -1)
    while (circles.length < 1024 * N && limit > -1)
    {
        let overlapped = false
        var circle =
        {
            x: random(width),
            y: random(height),
            r: random(random(2, 32), 64)
        }
        for (let other of circles)
            if (circle.r + other.r > dist(circle.x, circle.y, other.x, other.y))
                overlapped = true
        if (!overlapped) circles.push(circle)
        limit--
    }

    for (let c of circles)
    {
        //  best palette
        fill(random(0,240),random(97,136),random(106,136))

        //  mix palette
        //fill(random(128, 90), random(120, 249), random(99, 228), 220)
        //fill(random(7,219),random(7,72),random(61,91)) // mix palette
        //fill(random(220,250),random(220,235),random(200,244)) // mix palette

        //  biased palette
        //fill(196, 255, 221)
        //fill(228, 93, 78)
        //fill(random(10, 228), random(100, 230), 210, 190) // purple
        //fill(60, random(220, 255), random(10, 196)) // greenish

        noStroke()
        ellipse(c.x, c.y, c.r * 2, c.r * 2)
    }
}

function setup()
{
    createCanvas(1280, 720)
    //background(0)
    //drawCircles()
}

function draw()
{
    background(0)
    drawCircles()
}
