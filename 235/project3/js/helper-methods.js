//PURPOSE: Generates a random floating point integer
//ARGUMENTS: A minimum value (inclusive), a maximum value (inclusive)
//RETURNS: A random floating point number between the given range
function random(min, max){
    return Math.random() * (max - min) + min;
}

function isColliding(a, b){
    let ab = a.getBounds();
	let bb = b.getBounds();
	return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

function lerp(start, end, amt){
    return start * (1-amt) + amt * end;
}