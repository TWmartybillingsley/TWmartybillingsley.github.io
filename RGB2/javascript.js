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
  // read all text boxes, check for out-of-bounds values
  r = document.getElementById('redValue').value;
  if (r>255){
    r = 255;
    document.getElementById('redValue').value = 255
  }
  if (r<0){
    r = 0;
    document.getElementById('redValue').value = 0
  }

  g = document.getElementById('greenValue').value;
  if (g>255){
    g = 255;
    document.getElementById('greenValue').value = 255
  }
  if (g<0){
    g = 0;
    document.getElementById('greenValue').value = 0
  }

  b = document.getElementById('blueValue').value;
  if (b>255){
    b = 255;
    document.getElementById('blueValue').value = 255
  }
  if (b<0){
    b = 0;
    document.getElementById('blueValue').value = 0
  }

  // update the sliders showing color values
  document.getElementById('redSlider').value = `${r}`
  document.getElementById('greenSlider').value = `${g}`
  document.getElementById('blueSlider').value = `${b}`

  updateColors(r,g,b)
}

function updateColors(r,g,b){
  // update flashlight paths
  document.getElementById('redLightPath').style=`fill: rgb(${r},0,0);` 
  document.getElementById('greenLightPath').style=`fill: rgb(0,${g},0);` 
  document.getElementById('blueLightPath').style=`fill: rgb(0,0,${b});` 

  // update rocket -- has very light gray border so it shows up when color is white
  //document.getElementById('rocketBody').setAttribute("style", `fill:rgb(${r},${g},${b});stroke:#eeeeee;stroke-width:0.5px`)
  //document.getElementById('rocketNose').setAttribute("style", `fill:rgb(${r},${g},${b});stroke:#eeeeee;stroke-width:0.5px`)
}

function hideHelp(){
  document.getElementById('helpBox').style.display = "none";
  document.getElementById('questionMark').style.display = "block";
}

function showHelp(){
  document.getElementById('helpBox').style.display = "block";
  document.getElementById('questionMark').style.display = "none";
}


