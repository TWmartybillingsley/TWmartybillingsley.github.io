// start out in easiest mode -- set this up at bottom of javascript
var mode = 1


// empty out feedback div
function clearFeedback(){
	document.getElementById("feedback").innerHTML = "Click 'Check Answer!' when ready."
}

function chooseButton(btnNum){
	switch(btnNum) {
		case 1: 
		  document.getElementById('btn1').style.backgroundColor = "#E56700";
		  document.getElementById('btn2').style.backgroundColor = "#f79520";
		  document.getElementById('btn3').style.backgroundColor = "#f79520";
		  break;
		case 2: 
			document.getElementById('btn2').style.backgroundColor = "#E56700";
			document.getElementById('btn1').style.backgroundColor = "#f79520";
			document.getElementById('btn3').style.backgroundColor = "#f79520";
		  break;
		case 3:
			document.getElementById('btn3').style.backgroundColor = "#E56700";
		  	document.getElementById('btn2').style.backgroundColor = "#f79520";
		  	document.getElementById('btn1').style.backgroundColor = "#f79520";
		  break;
		default:
			document.getElementById('btn1').style.backgroundColor = "#f79520";
		  	document.getElementById('btn2').style.backgroundColor = "#f79520";
		  	document.getElementById('btn2').style.backgroundColor = "#f79520";
	  }

}

// sets the users color circle to whatever color the sliders dictate
function updateUserColorCircle(){
	clearFeedback()
	colorCircle = document.getElementById("userCircle")
	redSlider = document.getElementById('red')
	greenSlider = document.getElementById('green')
	blueSlider = document.getElementById('blue')
	redVal = document.getElementById('redVal')
	greenVal = document.getElementById('greenVal')
	blueVal = document.getElementById('blueVal')
	r = redSlider.value
	g = greenSlider.value
	b = blueSlider.value
	newColor = 'rgb(' + r + ',' + g + ',' + b + ')'
	colorCircle.style.backgroundColor =  newColor
	redVal.innerHTML = r
	greenVal.innerHTML = g
	blueVal.innerHTML = b
}

// executes onchange, not oninput
// in modes 1 and 2, restricts the slider movement
function moveSlider(id){
	clearFeedback()
	sldr = document.getElementById(id)
	val = sldr.value
	switch(mode) {
	  case 1: //0 or 255
	    if (val < 128){
	    	newVal = 0
	    }
	    else{
	    	newVal = 255
	    }
	    break;
	  case 2: //0, 128, or 255
	    if (val < 64){
	    	newVal = 0
	    } else if (val < 192){
	    	newVal = 128
	    } else {
	    	newVal = 256
	    }
	    break;
	  default:
	    newVal = val
	}
	sldr.value = newVal
	updateUserColorCircle()
}

// sets up a new challenge
// mode 1: rgb can be either 0 or 255: 8 colors
// mode 2: rgb can be 0, 128, or 256 yeah, made the math easier to not use 255): 27 colors
// mode 3: rgb can be 0-255: 2^24 colors
function makeChallengeColor(level){
	mode = level

	// reset sliders and user's color circle and feedback text
	document.getElementById('red').value = 0
	document.getElementById('green').value = 0
	document.getElementById('blue').value = 0
	updateUserColorCircle()
	clearFeedback()

	switch(mode) {
	  case 1: //0 or 255
	    makeChallengeColor1()
	    break;
	  case 2: //0, 128, or 256
	    makeChallengeColor2()
	    break;
	  case 3: //any color
	    makeChallengeColor3()
	    break;
	  default:
	    // leave the value alone
	}



}

// generates a color, rgb random 0-255 (hardest)
function makeChallengeColor3(){
	r = Math.floor(Math.random()*256)
	g = Math.floor(Math.random()*256)
	b = Math.floor(Math.random()*256)
	challengeColor = 'rgb(' + r + ',' + g + ',' + b + ')'
	challengeCircle = document.getElementById("challengeCircle")
	challengeCircle.style.backgroundColor =  challengeColor
}

// generates a color, rgb either 0 or 255 (easiest)
function makeChallengeColor2(){
	r = Math.floor(Math.random()*3)*128
	g = Math.floor(Math.random()*3)*128
	b = Math.floor(Math.random()*3)*128
	challengeColor = 'rgb(' + r + ',' + g + ',' + b + ')'
	challengeCircle = document.getElementById("challengeCircle")
	challengeCircle.style.backgroundColor =  challengeColor
}


// generates a color, rgb either 0 or 255 (easiest)
function makeChallengeColor1(){
	r = Math.floor(Math.random()*2)*255
	g = Math.floor(Math.random()*2)*255
	b = Math.floor(Math.random()*2)*255
	challengeColor = 'rgb(' + r + ',' + g + ',' + b + ')'
	challengeCircle = document.getElementById("challengeCircle")
	challengeCircle.style.backgroundColor =  challengeColor
}


// compares color in user's color box to the challenge
// provides some hints if answer is wrong
function checkColor(){
	// prepare to give feedback
	msg = ""

	// parse the challenge color
	challengeColor = challengeCircle.style.backgroundColor
	challengeColor = challengeColor.replace(/[^\d,]/g, '').split(',');
	rChallenge = parseInt(challengeColor[0])
	gChallenge = parseInt(challengeColor[1])
	bChallenge = parseInt(challengeColor[2])

	// parse the user color
	userColor = userCircle.style.backgroundColor
	userColor = userColor.replace(/[^\d,]/g, '').split(',');
	rUser = parseInt(userColor[0])
	gUser = parseInt(userColor[1])
	bUser = parseInt(userColor[2])

	// can't compare two arrays directly (they are different objects)
	if ((rChallenge==rUser)&&(gChallenge==gUser)&&(bChallenge==bUser)){
		//console.log('same')
		msg = "Good job! <br>Both colors are exactly the same!"
	}
	else{
		// not identical; how close?
		rDif = Math.abs(rChallenge-rUser)
		gDif = Math.abs(gChallenge-gUser)
		bDif = Math.abs(bChallenge-bUser)
		close = 25
		if ((rDif<close) &&
			(gDif<close) &&
			(bDif<close)){
			msg = "You're pretty close!"
		}else{
			msg = "The two colors are different.  "
		}
		// wrong answer, give a hint
		if (Math.max(rDif, gDif, bDif) == rDif) {
			if (rChallenge < rUser){
				msg += "<br>Too much red."
			} else {
				msg += "<br>Not enough red."
			}
		}
		if (Math.max(rDif, gDif, bDif) == gDif) {
			if (gChallenge < gUser){
				msg += "<br>Too much green."
			} else {
				msg += "<br>Not enough green."
			}
		}
		if (Math.max(rDif, gDif, bDif) == bDif) {
			if (bChallenge < bUser){
				msg += "<br>Too much blue."
			} else {
				msg += "<br>Not enough blue."
			}
		}
	}
	feedbackBox = document.getElementById("feedback")
	feedbackBox.innerHTML = msg
	
}

function hideHelp(){
	document.getElementById('helpBox').style.display = "none";
  }
  
  function showHelp(){
	document.getElementById('helpBox').style.display = "block";
  }
  

// start out in easiest mode 
var mode = 1
makeChallengeColor(1);
chooseButton(1);
