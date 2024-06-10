// single global LightStrand
// further development: need more than one -- dictionary of LightStrands?
var lights;




// a Light is a single pixel in a LightStrand
class Light {

	constructor(){
		this.red = 0;
		this.green = 0;
		this.blue = 0;
	}

	// setColor
	// sets rgb of the Light
	setColor(r, g, b){
		if (r > 255){r = 255};
		if (r < 0){r = 0};
		if (g > 255){g = 255};
		if (g < 0){g = 0};
		if (b > 255){b = 255};
		if (b < 0){b = 0};
		this.red = r;
		this.green = g;
		this.blue = b;
	}

	// getColorString
	// return value: string
	// generates CSS for Light's rgb
	getColorString(){
		var returnStr = "rgb("+this.red+","+this.green+","+this.blue+")";
		return returnStr;
	}


}

// a LightStrand is a series of neoPixels
// xpos, ypos: position the strand on the web page
// lightArray: array of numLights Lights
class LightStrand{
	constructor(num, xpos, ypos){
		this.xpos = xpos;
		this.ypos = ypos;
		this.numLights = num;
		this.lightArray = []
		for (var i=0;i<num;i++){
			let l=new Light()
			this.lightArray.push(l);
		}
	}

	// setMultipleLights
	// sets Light #start through #end in the LightStrand to color rgb
	setMultipleLights(startPixel,endPixel, r, g, b){
		// ensure pixel numbers are in range; if not, set pixel numbers to within range
		if (startPixel < 0) { startPixel = 0; }
		if (endPixel >= this.lightArray.length) { endPixel = this.lightArray.length - 1;}
		for (var i=startPixel; i<=endPixel; i++){
			this.lightArray[i].setColor(r,g,b);
		}
	}

	// setLightColor
	// sets Light #pixelNum in the LightStrand to color rgb
	setLightColor(pixelNum, r, g, b){
		// ensure pixel number is in range; if not, do nothing
		if ((pixelNum >= 0) && (pixelNum < this.lightArray.length)) {
			this.lightArray[pixelNum].setColor(r,g,b);
		}
	}


	// showLights
	// generates HTML to display LightStrand on web page
	showLights(){
		var lightsDiv = document.getElementById('lightsDiv');
		// each bulb takes 50 pixels, add room on right
		var w = this.lightArray.length * 50 + 10;
		var h = 50;
		lightsDiv.style.width = w+"px";
		lightsDiv.style.height = h+"px";
		lightsDiv.innerHTML = "";
		for (var i=0; i<this.lightArray.length; i++){
			var left = this.xpos + i*50;
			var c = this.lightArray[i].getColorString()
			var divHTML = "<div class='dot' style='background-color:";
			divHTML += c;
			divHTML += "; left:"
			divHTML += left;
			divHTML += "px; top:"
			divHTML += this.ypos;
			divHTML += "px'></div>"
			lightsDiv.innerHTML += divHTML;
		}
		
	}

}

// makeLights
// arguments: none
// makes an instance of LightStrand
// number of lights is read from HTML input numLights
// return val: none
// global var: lights (LightStrand)
function makeLights(){
	var num = parseInt(document.getElementById('numLights').value);
	let l = new LightStrand(num, 10, 10);
	lights = l;
}

function blocklyMakeLights(num){
	let l = new LightStrand(num, 10, 10);
	lights = l;
	showLights()
}

// showLights
// arguments: none
// return val: none
// global var: lights (LightStrand)
// create HTML to show lights on page
function showLights(){
	if (typeof lights == "undefined"){alert('Must create light strand first'); return;}
	lights.showLights();
}

// setLotsOfLights
// arguments: none
// start and end: read from HTML input startVal, endVal
// colors (r, g, b) read from HTML input redVal, greenVal, blueVal
// return val: none
// global var: lights (LightStrand)
function setLotsOfLights(){
	var start = parseInt(document.getElementById('startVal').value);
	var end = parseInt(document.getElementById('endVal').value);
	var r = parseInt(document.getElementById('redVal').value);
	var g = parseInt(document.getElementById('greenVal').value);
	var b = parseInt(document.getElementById('blueVal').value);
	lights.setMultipleLights(start,end, r, g, b);
	lights.showLights();
}

function blocklySetLotsOfLights(start, end, colorList){
	if (typeof lights == "undefined"){alert('Must create light strand first'); return;}
	r = colorList[0];
	g = colorList[1];
	b = colorList[2];
	lights.setMultipleLights(start,end, r, g, b);
	lights.showLights();
}

// setOneLight
// arguments: none
// pixel num: read from HTML input pixelNum
// colors (r, g, b) read from HTML input redVal2, greenVal2, blueVal2
// return val: none
// global var: lights (LightStrand)
function setOneLight(){
	var pixelNum = parseInt(document.getElementById('pixelNum').value);
	var r = parseInt(document.getElementById('redVal2').value);
	var g = parseInt(document.getElementById('greenVal2').value);
	var b = parseInt(document.getElementById('blueVal2').value);
	lights.setLightColor(pixelNum, r, g, b);
	lights.showLights();
}


function blocklySetOneLight(pixelNum, colorList){
	if (typeof lights == "undefined"){alert('Must create light strand first'); return;}
	r = colorList[0];
	g = colorList[1];
	b = colorList[2];
	lights.setLightColor(pixelNum, r, g, b);
	lights.showLights();
}





