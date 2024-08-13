// create web audio api context
var osc
var audioCtx;

// map key name to frequency
var frequencies = new Map();
frequencies.set("c4", 261.63);
frequencies.set("d4b", 277.18);
frequencies.set("d4", 293.66);
frequencies.set("e4b", 311.13);
frequencies.set("e4", 329.63);
frequencies.set("f4", 349.23);
frequencies.set("g4b", 369.99);
frequencies.set("g4", 392.00);
frequencies.set("a4b", 415.30);
frequencies.set("a4", 440.00);
frequencies.set("b4b", 466.16);
frequencies.set("b4", 493.88);
frequencies.set("c5", 523.25);
frequencies.set("d5b", 554.37);
frequencies.set("d5", 587.33);
frequencies.set("e5b", 622.25);
frequencies.set("e5", 659.25);
frequencies.set("f5", 698.46);
frequencies.set("g5b", 739.99);
frequencies.set("g5", 783.99);
frequencies.set("a5b", 830.61);
frequencies.set("a5", 880.00);
frequencies.set("b5b", 932.33);
frequencies.set("b5", 987.77);
frequencies.set("c6", 1046.50);
frequencies.set("d6b", 1108.73);
frequencies.set("d6", 1174.66);
frequencies.set("e6b", 1244.51);
frequencies.set("e6", 1318.51);
frequencies.set("f6", 1396.91);
frequencies.set("g6b", 1479.98);
frequencies.set("g6", 1567.98);
frequencies.set("a6b", 1661.22);
frequencies.set("a6", 1760.00);
frequencies.set("r", 0); // rest


// map key name to key color (black or white)
var keyColors = new Map();
keyColors.set("c4", "white");
keyColors.set("d4b", "black");
keyColors.set("d4", "white");
keyColors.set("e4b", "black");
keyColors.set("e4", "white");
keyColors.set("f4", "white");
keyColors.set("g4b", "black");
keyColors.set("g4", "white");
keyColors.set("a4b", "black");
keyColors.set("a4", "white");
keyColors.set("b4b", "black");
keyColors.set("b4", "white");
keyColors.set("c5", "white");
keyColors.set("d5b", "black");
keyColors.set("d5", "white");
keyColors.set("e5b", "black");
keyColors.set("e5", "white");
keyColors.set("f5", "white");
keyColors.set("g5b", "black");
keyColors.set("g5", "white");
keyColors.set("a5b", "black");
keyColors.set("a5", "white");
keyColors.set("b5b", "black");
keyColors.set("b5", "white");
keyColors.set("c6", "white");
keyColors.set("d6b", "black");
keyColors.set("d6", "white");
keyColors.set("e6b", "black");
keyColors.set("e6", "white");
keyColors.set("f6", "white");
keyColors.set("g6b", "black");
keyColors.set("g6", "white");
keyColors.set("a6b", "black");
keyColors.set("a6", "white");
keyColors.set("r", "white");


// map key name to text shown on key and in noteBox
var keyNameDisplay = new Map();
keyNameDisplay.set("c4", "C4");
keyNameDisplay.set("d4b", "C#/Db4");
keyNameDisplay.set("d4", "D4");
keyNameDisplay.set("e4b", "D#/Eb4");
keyNameDisplay.set("e4", "E4");
keyNameDisplay.set("f4", "F4");
keyNameDisplay.set("g4b", "F#/Gb4");
keyNameDisplay.set("g4", "G4");
keyNameDisplay.set("a4b", "G#/Db4");
keyNameDisplay.set("a4", "A4");
keyNameDisplay.set("b4b", "A#/Bb4");
keyNameDisplay.set("b4", "B4");
keyNameDisplay.set("c5", "C5");
keyNameDisplay.set("d5b", "C#/Db5");
keyNameDisplay.set("d5", "D5");
keyNameDisplay.set("e5b", "D#/Eb5");
keyNameDisplay.set("e5", "E5");
keyNameDisplay.set("f5", "F5");
keyNameDisplay.set("g5b", "F#/Gb5");
keyNameDisplay.set("g5", "G5");
keyNameDisplay.set("a5b", "G#/Db5");
keyNameDisplay.set("a5", "A5");
keyNameDisplay.set("b5b", "A#/Bb5");
keyNameDisplay.set("b5", "B5");
keyNameDisplay.set("c6", "C6");
keyNameDisplay.set("d6b", "C#/Db6");
keyNameDisplay.set("d6", "D6");
keyNameDisplay.set("e6b", "D#/Eb6");
keyNameDisplay.set("e6", "E6");
keyNameDisplay.set("f6", "F6");
keyNameDisplay.set("g6b", "F#/G64");
keyNameDisplay.set("g6", "G6");
keyNameDisplay.set("a6b", "G#/Db6");
keyNameDisplay.set("a6", "A6");
keyNameDisplay.set("r", "R");


var noteBoxArray = [];   // notes that have been played, stored in internal form (not what is displayed in noteBox)
var noteSpeed = 1000;    // speed to be selected by user; default to slow
var playbackOn = false;	 // playback indicator; prevent interrupt that happens when playback button pressed repeatedly

function initSound() {
	// create web audio api context
	audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	// create Oscillator node
	osc = audioCtx.createOscillator();
	osc.type = "sine";
	osc.frequency.setValueAtTime(0, audioCtx.currentTime); // value in hertz
	osc.connect(audioCtx.destination);
	osc.start();
}


function keyPressed(keyName){
	// highlight the key 
	document.getElementById(keyName).style.backgroundColor = "#34B84B";  // TinkRworks light green

	// turn sound on
	soundOn(frequencies.get(keyName));

	// add note to noteBox
	document.getElementById("noteBox").innerHTML += keyNameDisplay.get(keyName) + "&nbsp;&nbsp;&nbsp;";
	// and to noteBoxArray
	noteBoxArray.push(keyName);
}


function keyReleased(keyName){
	// unhighlight the key -- turn it back to original color
	document.getElementById(keyName).style.backgroundColor = keyColors.get(keyName);

	// turn sound off if it exists (trap error: mouseLeave before sound played)
	if(audioCtx){
		soundOff();
	}
}


function soundOn(freq){
	if(!audioCtx){
    	initSound();
  	}
	osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
}

function soundOff(){
	if(!audioCtx){
    	initSound();
  	}
	osc.frequency.setValueAtTime(0, audioCtx.currentTime);
}

function clearNoteBox(){
	if (!playbackOn){
		document.getElementById("noteBox").innerHTML = " ";
		noteBoxArray = [];
	}
}


function showNotePlaying(i){
	// highlights piano key and text at noteBoxArray[i] on playback
	if (i>=0){
		keyName = noteBoxArray[i];
		document.getElementById(keyName).style.backgroundColor = "#34B84B";  // TinkRworks light green
	
		// in noteBox, highlight note playing: accumulate text to display
		var newHTML = "";
		// text black for the first notes
		for (var j=0; j<i; j++){
			newHTML += keyNameDisplay.get(noteBoxArray[j]) + "&nbsp;&nbsp;&nbsp;";
		}
		// note playing has different color text and font weight in noteBoxArray
		newHTML+= "<span style='color:#019744;font-weight:900;'>";   // TinkRworks dark green
		newHTML += keyNameDisplay.get(noteBoxArray[j]) + "</span>&nbsp;&nbsp;&nbsp;";
		// text black for the rest of the notes
		for (var j=i+1; j<noteBoxArray.length; j++){
			newHTML += keyNameDisplay.get(noteBoxArray[j]) + "&nbsp;&nbsp;&nbsp;";
		}
		// display the text
		document.getElementById("noteBox").innerHTML = newHTML;
		setScrollBarTo(i/noteBoxArray.length);
	}
}

function setScrollBarTo(pct){
	var exteriorWidth = document.getElementById("noteBoxContainer").offsetWidth;
	var interiorWidth = document.getElementById("noteBox").offsetWidth;
	var leftFudgeFactor = exteriorWidth/2;
	var scrollLoc = pct*interiorWidth-leftFudgeFactor;
	document.getElementById("noteBoxContainer").scrollTo(scrollLoc, 0);
	
}	

function stopShowNotePlaying(i){
	// unhighlights piano key at noteBoxArray[i] if i>=0
	if (i>=0){
		keyName = noteBoxArray[i];
		document.getElementById(keyName).style.backgroundColor = keyColors.get(keyName);

		// in noteBox, unhighlight note playing
		var newHTML = "";
		for (var j=0; j<noteBoxArray.length; j++){
			newHTML += keyNameDisplay.get(noteBoxArray[j]) + "&nbsp;&nbsp;&nbsp;";
		}
		document.getElementById("noteBox").innerHTML = newHTML;
	}
}

var intv = null;
function playBack(){
	if (!playbackOn){   // avoid multiple playbacks
		// play notes in noteBoxArray at a certain tempo (based on noteSpeed)
		// highlight the notes in noteBox, highlight piano keys
		playbackOn = true;
		var i = 0;
		intv = setInterval(function() {
			soundOff();
			if (!playbackOn){
				// stop button was pressed; stop everything
				soundOff();
				resetPiano();
				clearInterval(intv);
			}
		    else if (i >= noteBoxArray.length) {
		    	stopShowNotePlaying(i-1);
		    	playbackOn = false;
		    	setScrollBarTo(0);
		        clearInterval(intv);
		    } else {
		    	stopShowNotePlaying(i-1);
		        soundOn(frequencies.get(noteBoxArray[i]));
		        showNotePlaying(i);
		        ++i;
		    }
		}, noteSpeed);
	}
}

function stopPlayBack(){
	playbackOn = false;
}

function resetPiano(){   // unhighlights all notes and all text in noteBox
	for (var j=0; j<noteBoxArray.length; j++){
		keyName = noteBoxArray[j];
		document.getElementById(keyName).style.backgroundColor = keyColors.get(keyName);
	}
	var newHTML = "";
	for (var j=0; j<noteBoxArray.length; j++){
		newHTML += keyNameDisplay.get(noteBoxArray[j]) + "&nbsp;&nbsp;&nbsp;";
	}
	document.getElementById("noteBox").innerHTML = newHTML;
	setScrollBarTo(0);
}

function changeSpeed(){
	// sets global var noteSpeed based on option selected
	if (document.getElementById("speedOption").value == "slow"){		
		noteSpeed = 1000;
		document.getElementById("speedIcon").style.backgroundImage = "url('snail.png')";
	} else if (document.getElementById("speedOption").value == "medium"){
		noteSpeed = 500;
		document.getElementById("speedIcon").style.backgroundImage = "url('rabbit.png')";
	} else { // fast
		noteSpeed = 250;
		document.getElementById("speedIcon").style.backgroundImage = "url('cheetah.png')";
	}	
}


// try switching to event listeners
//document.getElementById('piano').addEventListener('mousedown', highlightNEW, false);


//function highlightNEW(){
//	this.style.backgroundColor = "#888888";
//}