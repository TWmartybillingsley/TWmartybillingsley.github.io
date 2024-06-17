// SVG scale is not used; instead, a sizing factor is calculated,
// based on the size of the window
// (calculated on load, and when window is resized)

// for sizing the grid
var factor = 1
var rawScreenWidth = 320
var rawScreenHeight = 240
var screenWidth = rawScreenWidth*factor
var screenHeight = rawScreenHeight*factor
var svgWidth = screenWidth + 100
var svgHeight = screenHeight + 100
var xOffset = 15*factor
var yOffset = 10*factor
var gridSpacing = 20  // factor taken into account when drawing/labeling grid
var gridColor = "rgba(100,100,100,0.2)"

resizeGridVars()

// global variables used to toggle state
// show (or not) dot at x,y -- rect, oval, text
var globalDot = false;
var dotVisibility = "hidden";
// show (or not) grid lines and numbers
var gridVisibility = "visible";



function resizeGridVars(){
  factor = window.innerWidth/(3*rawScreenWidth)
  screenWidth = rawScreenWidth*factor
  screenHeight = rawScreenHeight*factor
  svgWidth = screenWidth + 100
  svgHeight = screenHeight + 100
  xOffset = 10*factor
  yOffset = 10*factor
}

window.addEventListener("resize", setScreenLoc);
function setScreenLoc(){
  // runs on window resize
  // deletes the screen, resizes the box the screen resides in, redraws screen and runs code to redraw shapes

  // delete grid
  removeID('mainSVG');

  // resize the screen
  resizeGridVars();
  setDivSizeLoc();

  // set the location of svgWhiteBox based on blockly div and width of box
  var bw = window.innerWidth-40
  var box = document.getElementById("svgWhiteBox")
  var w = screenWidth  + 20
  var left = bw - w - 60
  box.style.left = `${left}px`
  box.style.top = `110px`

  drawStartingState()
  runCode()
}

function setDivSizeLoc(){

  // set width/height of blockly div
  var bw = window.innerWidth-40
  document.getElementById("blocklyDiv").style.width = `${bw}px`
  var bh = window.innerHeight-100
  document.getElementById("blocklyDiv").style.height = `${bh}px`

  // sets the width/height of svgWhiteBox based on factor
  // div has a hard-coded padding of 20
  var w = screenWidth  + 20
  var h = parseInt(0.75 * w)
  var box = document.getElementById("svgWhiteBox")
  box.style.width=`${w}px`
  box.style.height=`${h}px`

  // set the location of svgWhiteBox based on blockly div
  var left = bw - w - 60
  box.style.left = `${left}px`

}

//************SVG************//
// generate SVG: initial (empty) screen with grid lines
function createSVG(){
  //console.log('running createSVG()')
  var divSelection = d3.select("#svgDIV");


  svgSelection = divSelection.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("id", "mainSVG"); 

  svgSelection.append('defs')
    .append('style')
    .attr('type', 'text/css')
    .text("@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900')");
}

// draw screen in SVG, create clip path
function createScreen(){
  var svgSelection = d3.select("#mainSVG");

  svgSelection.append("rect")
    .attr("x", xOffset)
    .attr("y", yOffset)
    .attr("width", screenWidth)
    .attr("height", screenHeight)
    .attr("id", "theScreen")
    .attr("class", "screen")
    .style("fill", "rgb(250,250,250")
    .style("stroke", "rgb(0,0,0)")
    .style("stroke-width", 1);

  // create clip path so shapes drawn on the screen don't overflow
  // this is NOT offset like the screen is; shapes will use a translate instead
  svgSelection.append("clipPath")
    .attr("id", "screenClip")
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", screenWidth)
    .attr("height", screenHeight)

}

// draw a grid on the screen
function drawVline(x){
  var svgSelection = d3.select("#mainSVG");

  svgSelection.append("line")
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("x1", x)
    .attr("y1", 0)
    .attr("x2", x)
    .attr("y2", screenHeight)
    .attr("class", "gridLine")
    .style("stroke", gridColor)
    .style("stroke-width", 1)
    .attr("visibility", `${gridVisibility}`);
}

function drawHline(y){
  var svgSelection = d3.select("#mainSVG");

  svgSelection.append("line")
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("x1", 0)
    .attr("y1", y)
    .attr("x2", screenWidth)
    .attr("y2", y)
    .attr("class", "gridLine")
    .style("stroke", gridColor)
    .style("stroke-width", 1)
    .attr("visibility", `${gridVisibility}`);
}

// label the vertical lines along the x axis
function writeVtext(txt,pos){
  var svgSelection = d3.select("#mainSVG");

  svgSelection.append("text")
    .text(txt)
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("x", pos)  
    .attr("y", -5)  // just above the grid
    .attr("class", "gridText")
    .attr("text-anchor", "middle")
    .style("font-family", "Roboto, sans-serif")
    .style("font-size", `${factor*5}px`)
    .attr("visibility", `${gridVisibility}`);
    
}

// label the horizontal lines down the y axis
function writeHtext(txt,pos){
  var svgSelection = d3.select("#mainSVG");

  svgSelection.append("text")
    .text(txt)
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("x", -5)  // just to the left of the grid
    .attr("y", pos+3) // down a few pixels to center text on line
    .attr("class", "gridText")
    .attr("text-anchor", "end")
    .style("font-family", "Roboto, sans-serif")
    .style("font-size", `${factor*5}px`)
    .attr("visibility", `${gridVisibility}`);
}

function drawGrid(){
  for (var x=0;x<=rawScreenWidth;x+=gridSpacing){
    drawVline(x*factor)
    writeVtext(x, x*factor)
  }
  for (var y=0;y<=rawScreenHeight;y+=gridSpacing){
    drawHline(y*factor)
    writeHtext(y, y*factor)
  }
}
// end of generating empty screen


//************Shapes************//
// note: when rect/oval/text is drawn, origin dot is created, but might be invisible


// draw shape -- rect
function createRect(fakeX,fakeY,w,h,r,g,b,f){
  var bordercolor = `rgb(${r},${g},${b})`
  var oppositeColor = `rgb(${255-r},${255-g},${255-b})`
  var fillcolor = bordercolor
  if (!f){
    fillcolor = "none"
    oppositeColor = bordercolor
  }

  realX = parseInt(fakeX) - parseInt(w/2)
  realY = parseInt(fakeY) - parseInt(h/2)

  var svgSelection = d3.select("#mainSVG");
  svgSelection.append("rect")
    .attr("clip-path", "url(#screenClip)")
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("x", realX*factor)
    .attr("y", realY*factor)
    .attr("width", w*factor)
    .attr("height", h*factor)
    .style("fill", fillcolor)
    .style("stroke", bordercolor)
    .style("stroke-width", 1*factor)
    .attr("class", "shape");

  // add a dot of contrasting color at center x,y
  // if no fill, dot will be border color
  svgSelection.append("circle")
    .attr("clip-path", "url(#screenClip)")
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("cx", fakeX*factor)
    .attr("cy", fakeY*factor)
    .attr("r", 2*factor)
    .style("fill", oppositeColor)
    .attr("class", "centerDot")
    .attr("visibility", `${dotVisibility}`);
  
}

// draw shape -- oval
function createOval(x,y,w,h,r,g,b,f){
  var bordercolor = `rgb(${r},${g},${b})`
  var oppositeColor = `rgb(${255-r},${255-g},${255-b})`
  var fillcolor = bordercolor
  if (!f){
    fillcolor = "none"
    oppositeColor = bordercolor
  }

  var svgSelection = d3.select("#mainSVG");
  svgSelection.append("ellipse")
    .attr("clip-path", "url(#screenClip)")
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("cx", x*factor)
    .attr("cy", y*factor)
    .attr("rx", parseInt(w/2)*factor)
    .attr("ry", parseInt(h/2)*factor)
    .style("fill", fillcolor)
    .style("stroke", bordercolor)
    .style("stroke-width", 1*factor)
    .attr("class", "shape");

  // add a dot of contrasting color at center x,y
  // if no fill, dot will be border color
  svgSelection.append("circle")
    .attr("clip-path", "url(#screenClip)")
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("cx", x*factor)
    .attr("cy", y*factor)
    .attr("r", 2*factor)
    .style("fill", oppositeColor)
    .attr("class", "centerDot")
    .attr("visibility", `${dotVisibility}`);
  
}

// draw shape -- line
function createLine(x1,y1,x2,y2,thick,r,g,b){
  var bordercolor = `rgb(${r},${g},${b})`

  var svgSelection = d3.select("#mainSVG");
  svgSelection.append("line")
    .attr("clip-path", "url(#screenClip)")
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("x1", x1*factor)
    .attr("y1", y1*factor)
    .attr("x2", x2*factor)
    .attr("y2", y2*factor)
    .style("stroke", bordercolor)
    .style("stroke-width", thick*factor)
    .attr("class", "shape");
}

// draw shape -- triangle
function createTriangle(x1,y1,x2,y2,x3,y3,r,g,b,f){
  var bordercolor = `rgb(${r},${g},${b})`
  var fillcolor = bordercolor
  if (!f){
    fillcolor = "none"
  }

  var svgSelection = d3.select("#mainSVG");
  svgSelection.append("polygon")
    .attr("clip-path", "url(#screenClip)")
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("points", `${x1*factor},${y1*factor} ${x2*factor},${y2*factor}, ${x3*factor},${y3*factor}`)
    .style("fill", fillcolor)
    .style("stroke", bordercolor)
    .style("stroke-width", 1*factor)
    .attr("class", "shape");
}

// draw shape -- text
function createText(x,y,textContents,size,r,g,b){
  var textcolor = `rgb(${r},${g},${b})`

  var svgSelection = d3.select("#mainSVG");
  svgSelection.append("text")
    .attr("clip-path", "url(#screenClip)")
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("x", x*factor)
    .attr("y", y*factor)
    .attr("dy",`${size*factor}px`)   // x,y is the top-left, not baseline-left
    .style("text-anchor", "start")
    .style("font-size",`${size*factor}px`)
    .style("fill", textcolor)
    .text(textContents)
    .attr("class", "shape");

    // add a dot of same color at center x,y
  svgSelection.append("circle")
    .attr("clip-path", "url(#screenClip)")
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("cx", x*factor)
    .attr("cy", y*factor)
    .attr("r", 2*factor)
    .style("fill", textcolor)
    .attr("class", "centerDot")
    .attr("visibility", `${dotVisibility}`);
}

function fillNewColor(r,g,b){
  // clear shapes and text from screen
  removeAllClass("shape");
  removeAllClass("centerDot");
  var screen = d3.select("#theScreen");
  screen.style("fill", `rgb(${r},${g},${b})`)
}





//--------useful functions to change state of SVG

function drawStartingState(){
  createSVG()
  createScreen()
  drawGrid()
}

function removeID(whichID){
  var idSelection = d3.select("#"+whichID);
  idSelection.remove()
}


function removeClass(whichClass){
  var classSelection = d3.select("."+whichClass);
  classSelection.remove()
}

function removeAllClass(whichClass){
  var classSelection = d3.selectAll("."+whichClass);
  classSelection.remove()
}

function resetScreenColor(){
  var screen = d3.select("#theScreen");
  screen.style("fill", "rgb(250,250,250")
}

function hideGrid(){
  var textSelection = d3.selectAll(".gridText");
  textSelection.attr("visibility", "hidden");
  var lineSelection = d3.selectAll(".gridLine");
  lineSelection.attr("visibility", "hidden");
}

function showGrid(){
  var textSelection = d3.selectAll(".gridText");
  textSelection.attr("visibility", "visible");
  var lineSelection = d3.selectAll(".gridLine");
  lineSelection.attr("visibility", "visible");
}

function toggleGrid(){
  if (gridVisibility == "visible"){
    hideGrid();
    gridVisibility = "hidden";
    document.getElementById("toggle-grid").innerHTML = "Show Grid";
  } else {
    showGrid();
    gridVisibility = "visible";
    document.getElementById("toggle-grid").innerHTML = "Hide Grid";
  }
}

function hideDots(){
  var dotSelection = d3.selectAll(".centerDot");
  dotSelection.attr("visibility", "hidden");
}

function showDots(){
  var dotSelection = d3.selectAll(".centerDot");
  dotSelection.attr("visibility", "visible");
}

function toggleOrigin(){
  if (dotVisibility == "visible"){
    hideDots();
    dotVisibility = "hidden";
    document.getElementById("toggle-origin").innerHTML = "Show Origin";
  } else {
    showDots();
    dotVisibility = "visible";
    document.getElementById("toggle-origin").innerHTML = "Hide Origin";
  }
}









