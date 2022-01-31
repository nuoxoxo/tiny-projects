perceptionRadius = 64
flock = []
H = 60
Size = 16
offset = Size / 2 + 3

# 0    RED
# 30   ORANGE
# 60   YELLOW
# 120  GREEN
# 180  CYAN
# 240  BLUE
# 270  PURPLE
# 300  PINK
# 330  CHERRY

def setup():
    size(720, 720)
    colorMode(HSB)
    for i in range(300):
        flock.append(Boid())

def draw():
    background(8)
    flock_ = flock[:]
    for f in flock:
        f.wrap()
        f.flock(flock_)
        f.update()
        f.show()

class Boid:
    def __init__(self):
        self.position = PVector(random(width), random(height))
        self.velocity = PVector.random2D()
        self.velocity.setMag(random(2, 4))
        self.acceleration = PVector()
        self.maxForce = 0.6 # gravity
        self.maxSpeed = 1.6
        self.H = random(20, H)
        self.S = random(20, 41)
        self.B = random(20, 90)

    def flock(self, boids):
        alignment = self.align(boids)
        self.acceleration.add(alignment)

        cohesion = self.cohere(boids)
        self.acceleration.add(cohesion)

        separation = self.separate(boids)
        self.acceleration.add(separation)

    def update(self):
        self.position.add(self.velocity)
        self.velocity.add(self.acceleration)
        self.acceleration.mult(0)

    def show(self):
        strokeWeight(Size)
        stroke(H, self.S, random(50, abs(100 - self.B)))
        point(self.position.x, self.position.y)

    def wrap(self):
        if self.position.x - offset > width:
            self.position.x = -offset
        elif self.position.x + offset < 0:
            self.position.x = width + offset

        if self.position.y - offset > height:
            self.position.y = -offset
        elif self.position.y + offset < 0:
            self.position.y = height + offset

    def separate(self, boids):
        total = 0
        steering = PVector()
        for other in boids:
            d = dist(
                other.position.x, other.position.y,
                self.position.x, self.position.y,
            )
            if other != self and d < perceptionRadius:
                away = PVector.sub(self.position, other.position)
                # away is a vector pointing away from the local flockmate `other`
                
                away.div(d) # the further the weaker the force, the closer the higher
                steering.add(away)
                total += 1
        if total > 0:
            steering.div(total)
            steering.setMag(self.maxSpeed)
            steering.sub(self.velocity)
            steering.limit(self.maxForce)

        return steering

    def cohere(self, boids):
        total = 0
        steering = PVector()

        for other in boids:
            d = dist(
                other.position.x, other.position.y,
                self.position.x, self.position.y,
            )
            if other != self and d < perceptionRadius:
                steering.add(other.position) # diff from align
                total += 1

        if total > 0:
            steering.div(total)
            steering.sub(self.position)
            steering.setMag(self.maxSpeed)
            steering.sub(self.velocity)
            steering.limit(self.maxForce)

        return steering

    def align(self, boids):
        total = 0
        steering = PVector()

        for other in boids:
            d = dist(
                other.position.x, other.position.y,
                self.position.x, self.position.y,
            )
            if other != self and d < perceptionRadius:
                steering.add(other.velocity)
                total += 1
        if total > 0:
            steering.div(total)
            steering.setMag(self.maxSpeed)
            # above line : to align, it depends on the direction-towards more than v
            steering.sub(self.velocity)
            steering.limit(self.maxForce)
        return steering
