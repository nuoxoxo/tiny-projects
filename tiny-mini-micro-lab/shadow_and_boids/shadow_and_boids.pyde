S = 720
A = 16
center = S / 2
offset = 30
def setup():
    background(255)
    size(S, S)
    noStroke()
    for _ in range(32):
        d = S / 5 - offset
        r = d / 2
        center_x = random(d, width - d)
        center_y = random(d, height - d)
        # Draw Shadow
        noStroke()
        fill(15, A)
        for i in range(64):
            circle(center_x + offset, center_y + offset, d - i * 5)
        # Draw Circle
        stroke(100)
        # fill(random(50, 250), random(200, 255), random(220))
        fill(172, 225, 220)
        circle(center_x, center_y, d)
