/* ************************************************************************** */
/*                                                                            */
/*                            \\             /`/``                            */
/*                            ~\o o_       0 0\                               */
/*                            / \__)      (u  ); _  _                         */
/*                     / \/ \/  /           \  \/ \/ \                        */
/*                    /(   . . )            (         )\                      */
/*                   /  \_____/              \_______/  \                     */
/*                       []  []               [[] [[]    *.                   */
/*                       []] []]              [[] [[]                         */
/*                                                                            */
/* ****************************************************************** nuo *** */

var vertices = []
var n = 128

function setup() {
	createCanvas(1280, 720)
	background(0)
	for (let i = 0; i < 16; i++) {
		var v = createVector(random(n, width-2*n), random(n, height-n))
		vertices.push(v)
	}
}

function draw() {
	var	unreached = []
	var	reached = []
	var	index_unreached
	var	index_reached
	var	R, U, D, temp

	for (let v of vertices)	unreached.push(v)
	reached.push(unreached.shift())
	while (unreached !== undefined && unreached.length) {
		temp = width
		for (let i = 0; i < reached.length; i++) {
			for (let j = 0; j < unreached.length; j++) {
				R = reached[i]
				U = unreached[j]
				D = dist(R.x, R.y, U.x, U.y)
				if (temp > D) {
					index_unreached = j
					index_reached = i
					temp = D
				}
			}
		}
		U = unreached[index_unreached]
		R = reached[index_reached]
		stroke(255)
		line(R.x, R.y, U.x, U.y)
		reached.push(U)
		unreached.splice(index_unreached, 1)
	}
	for (let v of vertices){
		fill(255)
		noStroke()
		rectMode(CENTER)
		rect(v.x, v.y, 32, 32, 8)
	}
}

function mousePressed() {
	if (mouseX < width && mouseY < height) {
		var v = createVector(mouseX, mouseY)
		vertices.push(v)
	}
}
