var DEBUG = false;

// Canvas context
var c;


var rspace;
// Called by HTML with the string name canvasId passed in
function initGraphics() {
	var canvasElement = canvasId;
	rspace = [0,0,canvasElement.width,canvasElement.height];
	c = canvasElement.getContext("2d");

	if (DEBUG) {
		console.log('Initialize Graphics complete.');
	}
}


var wspace = [-10,-10,10,10]; // x,y,x2,y2 window in 2d worldspace

function world2Real(x,y) {
	var dx = (x-wspace[0])/(wspace[2]-wspace[0]);
	var dy = (y-wspace[1])/(wspace[3]-wspace[1]);

	var rx = rspace[0] + dx*(rspace[2]-rspace[0]);
	var ry = rspace[1] + dy*(rspace[3]-rspace[1]);
	// flip y axis to be up down
	ry = rspace[3] - ry;

	return [rx,ry];
}

function world2RealArr(p) {
	return world2Real(p[0],p[1]);
}


function doOrbit() {
	if (DEBUG) {console.log("Doing orbit.");};
	var e_val = e_inp.valueAsNumber;
	var h_val = h_inp.valueAsNumber;
	if (DEBUG) {console.log("e = "+e_val+", h = "+h_val);};
	orbit.e = e_val;
	orbit.h = h_val;
	drawOrbit(orbit);
}

var N = 100; // Number of points to draw orbit with
function drawOrbit(orbit) {
	if (DEBUG) {console.log("Drawing orbit.");};
	softenImage();

	var dtheta = 2*Math.PI / N;
	c.strokeStyle = "#0f0";
	c.lineWidth=1;
	c.beginPath();
	var p = world2RealArr( polar2cart( getOrbitR(orbit,0), 0 ) );
	c.moveTo(p[0],p[1]);

	for (var theta = dtheta; theta <= 2*Math.PI; theta += dtheta) {
		p = world2RealArr( polar2cart( getOrbitR(orbit,theta), theta ) );
		c.lineTo(p[0],p[1]);
	};
	c.closePath();
	c.stroke();

	// Draw cross at origin
	var origin = world2Real(0,0);
	c.strokeStyle = "#000";
	c.lineWidth=2;
	drawCross(origin[0],origin[1])
}

// h = cross line width
function drawCross(x,y,h) {
	h = typeof(h) != 'undefined' ? h : 10; // Default h
	// Lines
	c.beginPath();
	c.moveTo(x-h/2,y);
	c.lineTo(x+h/2,y);
	c.moveTo(x,y-h/2);
	c.lineTo(x,y+h/2);
	c.closePath();
    c.stroke();
}

function softenImage() {
	c.fillStyle = "rgba(255,255,255,0.5)";
	c.fillRect(rspace[0],rspace[1],rspace[2],rspace[3]);
}