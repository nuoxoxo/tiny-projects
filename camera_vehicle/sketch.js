var mycamera;

var start_raycasting = false;

var half_plane_slider;

var number_of_rays_slider;
var plane_distance_slider;

function setup() {
	createCanvas(500, 500)

	createP("Move with arrows, press SPACE to raycast")
		.style('text-align', 'center')
		.style('width', '500px')
		.style('font-size', '20px')
		.style('font-family', 'Arial')

	createP("plane_size [0-200]:")
		.style('text-align', 'center')
		.style('width', '500px')

	half_plane_slider = createSlider(0, 200, 160)
	half_plane_slider.style('width', '500px').style('font-family', 'Arial')

	createP("Plane distance [0-100]:")
		.style('text-align', 'center')
		.style('width', '500px')

	plane_distance_slider = createSlider(0, 100, 40)
	plane_distance_slider.style('width', '500px').style('font-family', 'Arial');

	createP("number of rays [0-500]:")
		.style('text-align', 'center')
		.style('width', '500px')

	number_of_rays_slider = createSlider(0, 500, 100)

	number_of_rays_slider.style('width', '500px').style('font-family', 'Arial')

	mycamera = new camera(createVector(250, 250), createVector(-1, 1), 100, 40)
}

function draw() {

	// updating the camera values from sliders

	if (!mycamera.tracing_rays) {
		mycamera.half_plane_size = half_plane_slider.value() / 2
		mycamera.plane_distance = plane_distance_slider.value()
		mycamera.number_of_rays = number_of_rays_slider.value()
	} else {
		half_plane_slider.value(mycamera.half_plane_size * 2)
		plane_distance_slider.value(mycamera.plane_distance)
		number_of_rays_slider.value(mycamera.number_of_rays)
	}
	scale(1, -1)
	translate(0, -height)
	background(30)
	mycamera.update()
	if (start_raycasting) {
		mycamera.get_next_ray()
	}
	mycamera.draw();
	if (!mycamera.tracing_rays) {
		start_raycasting = false;

		// handling keys for visualisation

		if (keyIsDown(65))
			mycamera.dir.rotate(PI / 50);
		if (keyIsDown(68))
			mycamera.dir.rotate(-PI / 50);
		if (keyIsDown(UP_ARROW)) {
			let tempdir = mycamera.dir.copy();
			tempdir.setMag(5); // set the mag to be the step size
			mycamera.pos.add(tempdir);
		}
		if (keyIsDown(DOWN_ARROW)) {
			let tempdir = mycamera.dir.copy();
			tempdir.setMag(-5); // set the mag to be the step size
			mycamera.pos.add(tempdir);
		}
		if (keyIsDown(32)) {
			start_raycasting = true;
		}
	}
}

function   debug_draw_vector(origin, direction, scale)
{
direction = direction.copy();
direction.mult(scale);
direction.add(origin);
line(origin.x, origin.y, direction.x, direction.y);
}

class camera
{
constructor(pos, dir, half_plane_size, plane_distance)
{
dir.normalize()
this.pos = pos;
this.dir = dir;
this.half_plane_vector = dir.copy();
this.half_plane_vector.rotate(-HALF_PI).setMag(half_plane_size);
this.plane_distance = plane_distance;
this.half_plane_size = half_plane_size;
this.tracing_rays = false;
this.number_of_rays = width;
}

update()
{
this.half_plane_vector = this.dir.copy();
this.half_plane_vector.rotate(-HALF_PI).setMag(this.half_plane_size);
}

get_next_ray()
{
// the first time getting a ray, we have to initialize, the vector that will browse the projection plane, from the left, to the right
if (!this.tracing_rays)
{
this.current_position = this.dir.copy().mult(this.plane_distance).sub(this.half_plane_vector);
// this is the vector that will move current_position every time.
// the size will be (size of plane / number of rays we want), so 2*half_plane_size/screen_width
this.iter_vector = this.half_plane_vector.copy().setMag(2*this.half_plane_size/this.number_of_rays);
this.current_ray_index = 0;
this.tracing_rays = true;
}
if (this.current_ray_index > this.number_of_rays)
{
this.tracing_rays = false;
}
// here we are generating the new ray, and moving current position to the next
this.ray = this.current_position.copy();
this.current_position.add(this.iter_vector);
this.current_ray_index++;
return (this.ray.copy());
}

draw_ray()
{
push();
let current_position_on_plane = this.pos.copy().add(this.current_position);
// here is the ray we generated in blue
strokeWeight(1);
stroke(0, 0, 255);
debug_draw_vector(this.pos, this.current_position, 500);
// here is the point in the projection plane we are looking at colored green
stroke(0, 255, 0);
strokeWeight(2);
point(current_position_on_plane.x, current_position_on_plane.y);
pop();
}

draw()
{
push();
fill(255, 0, 0);
strokeWeight(5);
stroke(255, 0, 0);
// drawing the player position
point(this.pos.x, this.pos.y);
strokeWeight(1);
// drawing the direction vector (scaled to be visible, it is usually a normal vector - size 1 -)
stroke(100, 0, 0);
debug_draw_vector(this.pos, this.dir, this.plane_distance);
// drawing the projection plane (in here it's a line, as it's a 2d to 1d projection)
// the projection vector is half the plane, that goes from center to right
let plane_center = this.pos.copy().add(this.dir.copy().setMag(this.plane_distance));
stroke(102,102,0);
// drawing the projection plane
debug_draw_vector(plane_center, this.half_plane_vector, 1);
debug_draw_vector(plane_center, this.half_plane_vector, -1);
// drawing the field of view (the ray to the maximum left, and to the maximum right)
debug_draw_vector(this.pos, this.dir.copy().mult(this.plane_distance).add(this.half_plane_vector), 1);
debug_draw_vector(this.pos, this.dir.copy().mult(this.plane_distance).sub(this.half_plane_vector), 1);
// Drawing the ray here
if (this.tracing_rays)
{
this.draw_ray();
}
pop();
}
}
