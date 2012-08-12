// kepler orbit parameters
var orbit = {};
orbit.h = 2;
orbit.e = 0.3;

var G = 1; // Gravitational constant
var M = 1; // Mass of main body
var mu = G*M;


function getOrbitR(b,theta) {
	return getR(b.h,mu,b.e,theta);
}

function getR(h,mu,e,theta) {
	return h*h / mu * 1 / (1 + e*Math.cos(theta));
}

function polar2cart(r,theta) {
	var x = r*Math.cos(theta);
	var y = r*Math.sin(theta);
	return [x,y];
}