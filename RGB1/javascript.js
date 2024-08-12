function updateColorsFromSliders(){
	// read all sliders
	r = document.getElementById('redSlider').value;
	g = document.getElementById('greenSlider').value;
	b = document.getElementById('blueSlider').value;

  // update the textboxes showing color values
	document.getElementById('redValue').value = `${r}`
	document.getElementById('greenValue').value = `${g}`
	document.getElementById('blueValue').value = `${b}`

	updateColors(r,g,b)
}

function updateColorsFromTextboxes(){
  // read all text boxes
  r = document.getElementById('redValue').value;
  g = document.getElementById('greenValue').value;
  b = document.getElementById('blueValue').value;

  // update the sliders showing color values
  document.getElementById('redSlider').value = `${r}`
  document.getElementById('greenSlider').value = `${g}`
  document.getElementById('blueSlider').value = `${b}`

  updateColors(r,g,b)
}

function updateColors(r,g,b){
  // update overlapping circles
  document.getElementById('circleRed').style.backgroundColor = `rgb(${r},0,0)`
  document.getElementById('circleGreen').style.backgroundColor = `rgb(0,${g},0)`
  document.getElementById('circleBlue').style.backgroundColor = `rgb(0,0,${b})`

  // update rocket -- has very light gray border so it shows up when color is white
  document.getElementById('rocketBody').setAttribute("style", `fill:rgb(${r},${g},${b});stroke:#eeeeee;stroke-width:0.5px`)
  document.getElementById('rocketNose').setAttribute("style", `fill:rgb(${r},${g},${b});stroke:#eeeeee;stroke-width:0.5px`)
}

function hideHelp(){
  document.getElementById('helpBox').style.display = "none";
  document.getElementById('questionMark').style.display = "block";
}

function showHelp(){
  document.getElementById('helpBox').style.display = "block";
  document.getElementById('questionMark').style.display = "none";
}


// Make the circles draggable:
dragElement(document.getElementById("circleRed"));
dragElement(document.getElementById("circleGreen"));
dragElement(document.getElementById("circleBlue"));

function dragElement(elmnt) {
  
    /* move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    if ((elmnt.offsetTop - pos2)>0 && (elmnt.offsetTop - pos2)<250){ // limit vertical drag
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }
    if ((elmnt.offsetLeft - pos1)>0 && (elmnt.offsetLeft - pos1)<550){ // limit horizontal drag
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}