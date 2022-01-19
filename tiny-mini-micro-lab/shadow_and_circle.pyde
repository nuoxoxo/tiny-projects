S = 720
A = 16
center = S / 2
offset = 30
def setup():
    background(255)
    size(S, S)
    noStroke()

    # Draw Shadow
    fill(15, A)
    for i in range(30):
        circle(center + offset, center + offset, S / 3 - i * 5 - offset)

    # Draw Circle
    fill(172, 225, 225)
    circle(center, center, S / 3 - offset)
