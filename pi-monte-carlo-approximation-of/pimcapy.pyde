L = 720
A = 64

def setup():
    size(729, 729)
    background(0)
    translate(width / 2, height / 2)
    stroke(255, A)
    strokeWeight(2)
    noFill()
    ellipse(0, 0, L, L)

r = L / 2

def draw():
    translate(width / 2, height / 2)
    dots = 0
    incl = 0
    best = 0
    iter = 256
    for i in range(iter):
        dots += iter
        x = random(-r, r)
        y = random(-r, r)
        d = x * x + y * y
        if d < r * r:
            incl += iter
            stroke(80, random(64, 116), random(100, 220), A)
        else:
            noStroke()
        strokeWeight(16)
        point(x, y)
    curr = incl / dots * 4
    prec = abs(PI - best)
    temp = abs(PI - curr)
    if temp < prec:
        prec = temp
        best = curr
        percentage = abs(PI - prec) / PI * 100
        print("Precision: " + percentage + "% - Best Pi: " + bestPi)
