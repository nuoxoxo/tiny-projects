function setup()
{
    createCanvas(2800, 2800)
    //createCanvas(12800, 12800)
    pixelDensity(1)
    loadPixels()

    const Finess = 64
    const Maxitr = 100

    for (let x = 0; x < width; x ++)
    {
        for (let y = 0; y < height; y ++)
        {
            let a = map(x, 0, width, -2, 2)
            let b = map(y, 0, height, -2, 2)
            let ca = a
            let cb = b
            let n = 0

            while (n < Maxitr)
            {
                let temp_a = a * a - b * b
                let temp_b = a * b * 2

                a = ca + temp_a
                b = cb + temp_b
                
                if (a + b > Finess) break
                n ++
            }

            //let yanse = n === Maxitr ? 0 : 255
            let yanse = n === Maxitr ? 0 : map(n, 0, Finess, 0, 255)

            let px = (x + y * width) * 4
            pixels[px + 0] = 16//(0,0,color)
            pixels[px + 1] = 16//(0,0,color)
            pixels[px + 2] = yanse
            pixels[px + 3] = 255
        }
    }
    updatePixels()
}


