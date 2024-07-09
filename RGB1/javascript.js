function updateColors(){
	// read all sliders
	// update all overlapping circles
	r = document.getElementById('redSlider').value;
	g = document.getElementById('greenSlider').value;
	b = document.getElementById('blueSlider').value;

	document.getElementById('redValue').innerHTML = `${r}`
	document.getElementById('greenValue').innerHTML = `${g}`
	document.getElementById('blueValue').innerHTML = `${b}`

	// overlapping circles
	document.getElementById('circleRed').style.backgroundColor = `rgb(${r},0,0)`
	document.getElementById('circleGreen').style.backgroundColor = `rgb(0,${g},0)`
	document.getElementById('circleBlue').style.backgroundColor = `rgb(0,0,${b})`
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
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}