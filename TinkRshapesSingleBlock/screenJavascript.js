// for sizing the grid
var factor = 2
var rawScreenWidth = 320
var rawScreenHeight = 240
var screenWidth = rawScreenWidth*factor
var screenHeight = rawScreenHeight*factor
var svgWidth = screenWidth + 100
var svgHeight = screenHeight + 100
var xOffset = 10*factor + 2
var yOffset = 10*factor
var gridSpacing = 20  // factor taken into account when drawing/labeling grid
var gridColor = "rgba(100,100,100,0.2)"

// for switching block types
var blockType = "rect"

//************SVG************//
// generate SVG
function createSVG(){
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
    .style("stroke-width", 1);
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
    .style("stroke-width", 1);
}

// label the vertical lines along the x axis
function writeVtext(txt,pos){
  var svgSelection = d3.select("#mainSVG");

  svgSelection.append("text")
    .text(txt)
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("x", pos)  
    .attr("y", -5)  // just above the grid
    .attr("text-anchor", "middle")
    .style("font-family", "Roboto, sans-serif")
    .style("font-size", `${factor*5}px`)
}

// label the horizontal lines down the y axis
function writeHtext(txt,pos){
  var svgSelection = d3.select("#mainSVG");

  svgSelection.append("text")
    .text(txt)
    .attr("transform", `translate(${xOffset} ${yOffset})`)
    .attr("x", -5)  // just to the left of the grid
    .attr("y", pos+3) // down a few pixels to center text on line
    .attr("text-anchor", "end")
    .style("font-family", "Roboto, sans-serif")
    .style("font-size", `${factor*5}px`)
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


//************Shapes************//
// draw shape -- rect
function createRect(fakeX,fakeY,w,h,r,g,b,f,dot){
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

  if(dot){
    // add a dot of contrasting color at center x,y
    // if no fill, dot will be border color
    svgSelection.append("circle")
      .attr("clip-path", "url(#screenClip)")
      .attr("transform", `translate(${xOffset} ${yOffset})`)
      .attr("cx", fakeX*factor)
      .attr("cy", fakeY*factor)
      .attr("r", 2*factor)
      .style("fill", oppositeColor)
      .attr("class", "centerDot");
  }
}

// draw shape -- oval
function createOval(x,y,w,h,r,g,b,f,dot){
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

  if (dot){
    // add a dot of contrasting color at center x,y
    
    svgSelection.append("circle")
      .attr("clip-path", "url(#screenClip)")
      .attr("transform", `translate(${xOffset} ${yOffset})`)
      .attr("cx", x*factor)
      .attr("cy", y*factor)
      .attr("r", 2*factor)
      .style("fill", oppositeColor)
      .attr("class", "centerDot");
  }
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
function createText(x,y,textContents,size,r,g,b,dot){
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

  if(dot){
    // add a dot of same color at center x,y
    svgSelection.append("circle")
      .attr("clip-path", "url(#screenClip)")
      .attr("transform", `translate(${xOffset} ${yOffset})`)
      .attr("cx", x*factor)
      .attr("cy", y*factor)
      .attr("r", 2*factor)
      .style("fill", textcolor)
      .attr("class", "centerDot");
  }
}

//************ Controls (call the draw shape functions) ************//
// draw a single shape, based on type of block currently chosen
function drawShape(){   // run when Draw! button pressed
  // blockType is a global var set when user selects block type
  drawShapeFromInputs(blockType)
}

// draw single shape (rect, oval, line, triangle, text) based on inputs
// removes all other shapes on the screen
function drawShapeFromInputs(shapetype){

  removeAllClass("shape")
  removeAllClass("centerDot")
  fixColorInputs()  // ensure viable color inputs
  var r = parseInt(document.getElementById("sharedRed").value)
  var g = parseInt(document.getElementById("sharedGreen").value)
  var b = parseInt(document.getElementById("sharedBlue").value) 

  var fill = true
  if (document.getElementById("sharedTF").value == 'false'){
    fill = false
  }
  var dot = true
  if (document.getElementById("originPointCheckbox").checked == false){
    dot = false
  }

  switch (shapetype) {
  case "rect":
    fixRectOvalInputs() // ensure viable x,y,width/height inputs
    var x = parseInt(document.getElementById("sharedX").value)
    var y = parseInt(document.getElementById("sharedY").value)
    var w = parseInt(document.getElementById("rectOvalWidth").value)
    var h = parseInt(document.getElementById("rectOvalHeight").value)
    createRect(x,y,w,h,r,g,b,fill,dot)
    break;

  case "oval":
    fixRectOvalInputs() // ensure viable x,y,width/height inputs
    var x = parseInt(document.getElementById("sharedX").value)
    var y = parseInt(document.getElementById("sharedY").value)
    var w = parseInt(document.getElementById("rectOvalWidth").value)
    var h = parseInt(document.getElementById("rectOvalHeight").value)
    createOval(x,y,w,h,r,g,b,fill,dot)
    break;

  case "line":
    fixLineTriangleInputs() // ensure viable x,y inputs
    var x1 = parseInt(document.getElementById("sharedX").value)
    var y1 = parseInt(document.getElementById("sharedY").value)
    var x2 = parseInt(document.getElementById("point2x").value)
    var y2 = parseInt(document.getElementById("point2y").value)
    var thick = parseInt(document.getElementById("lineThickness").value)
    createLine(x1,y1,x2,y2,thick,r,g,b)
    break;

  case "triangle":
    fixLineTriangleInputs() // ensure viable x,y inputs
    var x1 = parseInt(document.getElementById("sharedX").value)
    var y1 = parseInt(document.getElementById("sharedY").value)
    var x2 = parseInt(document.getElementById("point2x").value)
    var y2 = parseInt(document.getElementById("point2y").value)
    var x3 = parseInt(document.getElementById("point3x").value)
    var y3 = parseInt(document.getElementById("point3y").value)
    createTriangle(x1,y1,x2,y2,x3,y3,r,g,b,fill)
    break;

  case "text":
    var x = parseInt(document.getElementById("sharedX").value)
    var y = parseInt(document.getElementById("sharedY").value)
    var textContents = document.getElementById("txttext").value
    var size = parseInt(document.getElementById("txtsize").value)
    createText(x,y,textContents,size,r,g,b,dot)
    break;

  default:
    console.log("incorrect shape type")
  }

}

//-------fix inputs that are out of range ----
function fixRectOvalInputs(){
  if (parseInt(document.getElementById("sharedX").value) > 999) {document.getElementById("sharedX").value = "999"}
  if (parseInt(document.getElementById("sharedX").value) < -999) {document.getElementById("sharedX").value = "-999"}
  if (parseInt(document.getElementById("sharedY").value) > 999) {document.getElementById("sharedY").value = "999"}
  if (parseInt(document.getElementById("sharedY").value) < -999) {document.getElementById("sharedY").value = "-999"}
  if (parseInt(document.getElementById("rectOvalWidth").value) > 999) {document.getElementById("rectOvalWidth").value = "999"}
  if (parseInt(document.getElementById("rectOvalWidth").value) <= 0) {alert("Must use positive numbers for width and height");document.getElementById("rectOvalWidth").value = "1"}  
  if (parseInt(document.getElementById("rectOvalHeight").value) > 999) {document.getElementById("rectOvalHeight").value = "999"}
  if (parseInt(document.getElementById("rectOvalHeight").value) <= 0) {alert("Must use positive numbers for width and height");document.getElementById("rectOvalHeight").value = "1"}  
}

function fixColorInputs(){
  // color values out of bounds are just quietly set to valid values
  if (parseInt(document.getElementById("sharedRed").value) > 255) {document.getElementById("sharedRed").value = "255"}
  if (parseInt(document.getElementById("sharedRed").value) < 0) {document.getElementById("sharedRed").value = "0"}  
  if (parseInt(document.getElementById("sharedGreen").value) > 255) {document.getElementById("sharedGreen").value = "255"}
  if (parseInt(document.getElementById("sharedGreen").value) <= 0) {document.getElementById("sharedGreen").value = "0"}  
  if (parseInt(document.getElementById("sharedBlue").value) > 255) {document.getElementById("sharedBlue").value = "255"}
  if (parseInt(document.getElementById("sharedBlue").value) <= 0) {document.getElementById("sharedBlue").value = "0"}   
}

function fixLineTriangleInputs(){
  if (parseInt(document.getElementById("point2x").value) > 999) {document.getElementById("point2x").value = "999"}
  if (parseInt(document.getElementById("point2x").value) < -999) {document.getElementById("point2x").value = "-999"}
  if (parseInt(document.getElementById("point2y").value) > 999) {document.getElementById("point2y").value = "999"}
  if (parseInt(document.getElementById("point2y").value) < -999) {document.getElementById("point2y").value = "-999"}
  if (parseInt(document.getElementById("point3x").value) > 999) {document.getElementById("point3x").value = "999"}
  if (parseInt(document.getElementById("point3x").value) < -999) {document.getElementById("point3x").value = "-999"}  
  if (parseInt(document.getElementById("point3y").value) > 999) {document.getElementById("point3y").value = "999"}
  if (parseInt(document.getElementById("point3y").value) < -999) {document.getElementById("point3y").value = "-999"}  
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


//-------functions to change CSS variables (when user switches blocks)

// Get the root element
var r = document.querySelector(':root');

// get a CSS variable value
function getCssVar(varName) {
  // get the styles (properties and values) for the root
  var rs = getComputedStyle(r);
  // fetch the value of the variable
  varName = "--"+varName;
  return rs.getPropertyValue(varName);
}

// set a CSS variable value
function setCssVar(varName, value) {
  // set the value of variable 
  varName = "--"+varName;
  r.style.setProperty(varName, value);
}

//-------functions to effect change in HTML
function changeBlockViaRadioButton(){
  newBlock = document.querySelector('input[name = "shape"]:checked').value
  changeBlock(newBlock)
  //console.log("switching to", newBlock)
}

function changeBlockShapeClick(newBlock, id){
  // update the radio button
  document.getElementById(id).checked = true
  changeBlock(newBlock)
  //console.log("switching to", newBlock)
}


function changeBlock(newBlock){
  // switches block type
  // sets some css depending on block chosen: some blocks (e.g., color) move when a different block is chosen
  // goal is to keep the same input between block changes, so input fields are moved rather than duplicated

  var oldBlock = blockType  // blockType is global var
  blockType = newBlock

  switch (newBlock){
  case "rect":
    document.getElementById("drawBlockInputs").style.backgroundImage = "url('images/drawRectangleBlock.png')"
    document.getElementById("sharedXYinputs").style.display = "block"
    setCssVar("sharedXYinputsTop", getCssVar("sharedXYinputsTop1"));
    
    document.getElementById("widthHeightInputs").style.display = "block"

    document.getElementById("sharedTF").style.display = "block"
    setCssVar("sharedTFTop", getCssVar("sharedTFTop1"));
    
    document.getElementById("colorInputs").style.display = "block"
    setCssVar("colorInputsTop", getCssVar("colorInputsTop1"));
    
    // hide line/triangle/text blocks
    document.getElementById("point2xyInputs").style.display = "none"
    document.getElementById("point3xyInputs").style.display = "none"
    document.getElementById("lineThickness").style.display = "none"
    document.getElementById("txttext").style.display = "none"
    document.getElementById("txtsize").style.display = "none"
    break;
  
  case "oval":
    document.getElementById("drawBlockInputs").style.backgroundImage = "url('images/drawOvalBlock.png')"
    document.getElementById("sharedXYinputs").style.display = "block"
    setCssVar("sharedXYinputsTop", getCssVar("sharedXYinputsTop1"));
    
    document.getElementById("widthHeightInputs").style.display = "block"

    document.getElementById("sharedTF").style.display = "block"
    setCssVar("sharedTFTop", getCssVar("sharedTFTop1"));
    
    document.getElementById("colorInputs").style.display = "block"
    setCssVar("colorInputsTop", getCssVar("colorInputsTop1"));
    
    // hide line/triangle/text blocks
    document.getElementById("point2xyInputs").style.display = "none"
    document.getElementById("point3xyInputs").style.display = "none"
    document.getElementById("lineThickness").style.display = "none"
    document.getElementById("txttext").style.display = "none"
    document.getElementById("txtsize").style.display = "none"
    break;

  case "line":
    document.getElementById("drawBlockInputs").style.backgroundImage = "url('images/drawLineBlock.png')"
    document.getElementById("sharedXYinputs").style.display = "block"
    setCssVar("sharedXYinputsTop", getCssVar("sharedXYinputsTop1"));

    document.getElementById("point2xyInputs").style.display = "block"
    
    document.getElementById("lineThickness").style.display = "block"
    
    document.getElementById("colorInputs").style.display = "block"
    setCssVar("colorInputsTop", getCssVar("colorInputsTop1"));

    // hide rect/oval/triangle/text blocks
    document.getElementById("widthHeightInputs").style.display = "none"
    document.getElementById("sharedTF").style.display = "none"
    document.getElementById("point3xyInputs").style.display = "none"
    document.getElementById("txttext").style.display = "none"
    document.getElementById("txtsize").style.display = "none"
    break;

  case "triangle":
    document.getElementById("drawBlockInputs").style.backgroundImage = "url('images/drawTriangleBlock.png')"
    document.getElementById("sharedXYinputs").style.display = "block"
    setCssVar("sharedXYinputsTop", getCssVar("sharedXYinputsTop1"));

    document.getElementById("point2xyInputs").style.display = "block"

    document.getElementById("point3xyInputs").style.display = "block"
    
    document.getElementById("sharedTF").style.display = "block"
    setCssVar("sharedTFTop", getCssVar("sharedTFTop2"));

    document.getElementById("colorInputs").style.display = "block"
    setCssVar("colorInputsTop", getCssVar("colorInputsTop2"));

    // hide rect/oval/line/text blocks
    document.getElementById("widthHeightInputs").style.display = "none"
    document.getElementById("lineThickness").style.display = "none"
    document.getElementById("txttext").style.display = "none"
    document.getElementById("txtsize").style.display = "none"
    break;

   case "text":
    document.getElementById("drawBlockInputs").style.backgroundImage = "url('images/writeTextBlock.png')"
    document.getElementById("txttext").style.display = "block"

    document.getElementById("sharedXYinputs").style.display = "block"
    setCssVar("sharedXYinputsTop", getCssVar("sharedXYinputsTop2"));

    document.getElementById("txtsize").style.display = "block"

    document.getElementById("colorInputs").style.display = "block"
    setCssVar("colorInputsTop", getCssVar("colorInputsTop3"));
    
    // hide rect/oval/line/triangle blocks
    document.getElementById("widthHeightInputs").style.display = "none"
    document.getElementById("point2xyInputs").style.display = "none"
    document.getElementById("point3xyInputs").style.display = "none"
    document.getElementById("sharedTF").style.display = "none"
    document.getElementById("lineThickness").style.display = "none"
    break;

    default:
    console.log("incorrect shape type")
  }
  
}


