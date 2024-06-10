
// Block functions return the code needed to draw on the screen

// For each top-level block, XML code will be generated and added to global variable xmlCode
// this is a kludge that is hard coded with values known at run time -- no math blocks will be generated
// screen variable (not part of the simulation) is added to the XML 

var xmlCode = '';
var xmlEndCode = '';
var xmlCompleteCode = ''
var firstBlock = true;  // the first block in the sequence doesn't have <next>

function newXML(){
  // XML for subroutine
  xmlCode = '<block xmlns="https://developers.google.com/blockly/xml" type="sub-def" x="700" y="800"><mutation xmlns="http://www.w3.org/1999/xhtml" num_arguments="0"></mutation><field name="name">drawBackground</field><statement name="body">';
  xmlEndCode = '</statement></block>'
  firstBlock = true;
}

function finishXML(){
  xmlCompleteCode = xmlCode + xmlEndCode;
}


Blockly.JavaScript['tw_fill_new_color'] = function(block) {
  var value_color = Blockly.JavaScript.valueToCode(block, 'RGB_COLOR', Blockly.JavaScript.ORDER_ATOMIC);
  var rgb = value_color.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var r=rgb[0];
  var g=rgb[1];
  var b=rgb[2];
  
  // Assemble XML
  var xmlTop, xmlBottom;
  if (firstBlock){
    xmlTop = '<block '
    xmlBottom = '</block>'
    firstBlock = false;
  } else {
    xmlTop = '<next><block '
    xmlBottom = '</block></next>'
  }
  xmlTop += `type="DISPLAY:FILL_NEW_COLOR"><value name="0"><block type="get"><field name="name">screen</field></block></value><value name="1"><block type="RGBLED:COLOR"><value name="0"><block type="integer"><field name="value">${r}</field></block></value><value name="1"><block type="integer"><field name="value">${g}</field></block></value><value name="2"><block type="integer"><field name="value">${b}</field></block></value></block></value>`
  xmlCode = xmlCode + xmlTop;
  xmlEndCode = xmlBottom + xmlEndCode

  // Assemble javascript into code variable.
  var code = `fillNewColor(${r},${g},${b})\n`;
  return code;
};


Blockly.JavaScript['tw_color'] = function(block) {
  var value_red = Blockly.JavaScript.valueToCode(block, 'RED', Blockly.JavaScript.ORDER_ATOMIC);
  var value_green = Blockly.JavaScript.valueToCode(block, 'GREEN', Blockly.JavaScript.ORDER_ATOMIC);
  var value_blue = Blockly.JavaScript.valueToCode(block, 'BLUE', Blockly.JavaScript.ORDER_ATOMIC);
  // Assemble javascript into code variable.
  var code = value_red+' '+value_green+' '+value_blue;  // return value is string -- must be sliced and split when received
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['tw_draw_rectangle'] = function(block) {
  var value_xy = Blockly.JavaScript.valueToCode(block, 'XY', Blockly.JavaScript.ORDER_ATOMIC);
  var xy = value_xy.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var x = parseInt(xy[0]);
  var y = parseInt(xy[1]);
  var value_width_height = Blockly.JavaScript.valueToCode(block, 'WIDTH_HEIGHT', Blockly.JavaScript.ORDER_ATOMIC);
  var wh = value_width_height.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var w = wh[0];
  var h = wh[1];
  var value_fill = Blockly.JavaScript.valueToCode(block, 'FILL?', Blockly.JavaScript.ORDER_ATOMIC);
  var f = value_fill.slice(1,-1);
  var value_color = Blockly.JavaScript.valueToCode(block, 'RGB_COLOR', Blockly.JavaScript.ORDER_ATOMIC);
  var rgb = value_color.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var r=rgb[0];
  var g=rgb[1];
  var b=rgb[2];

  // Assemble XML
  var xmlTop, xmlBottom, xmlFill;
  if (firstBlock){
    xmlTop = '<block '
    xmlBottom = '</block>'
    firstBlock = false;
  } else {
    xmlTop = '<next><block '
    xmlBottom = '</block></next>'
  }
  if (f=='true'){
    xmlFill = 1;
  } else {
    xmlFill = 0;
  }
  xmlTop += `type="DISPLAY:DRAW_RECTANGLE_TO"><value name="0"><block type="get"><field name="name">screen</field></block></value><value name="1"><block type="EXTENDED:TUPLE" inline="true"><value name="0"><block type="integer"><field name="value">${x}</field></block></value><value name="1"><block type="integer"><field name="value">${y}</field></block></value></block></value><value name="2"><block type="EXTENDED:TUPLE" inline="true"><value name="0"><block type="integer"><field name="value">${w}</field></block></value><value name="1"><block type="integer"><field name="value">${h}</field></block></value></block></value><value name="3"><block type="bool"><field name="value">${xmlFill}</field></block></value><value name="4"><block type="RGBLED:COLOR" inline="true"><value name="0"><block type="integer"><field name="value">${r}</field></block></value><value name="1"><block type="integer"><field name="value">${g}</field></block></value><value name="2"><block type="integer"><field name="value">${b}</field></block></value></block></value>`
  xmlCode = xmlCode + xmlTop;
  xmlEndCode = xmlBottom + xmlEndCode

  // Assemble javascript into code variable.
  var code = `createRect(${x},${y},${w},${h},${r},${g},${b},${f})\n`;
  return code;
};

Blockly.JavaScript['tw_draw_oval'] = function(block) {
  var value_xy = Blockly.JavaScript.valueToCode(block, 'XY', Blockly.JavaScript.ORDER_ATOMIC);
  var xy = value_xy.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var x = parseInt(xy[0]);
  var y = parseInt(xy[1]);
  var value_width_height = Blockly.JavaScript.valueToCode(block, 'WIDTH_HEIGHT', Blockly.JavaScript.ORDER_ATOMIC);
  var wh = value_width_height.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var w = wh[0];
  var h = wh[1];
  var value_fill = Blockly.JavaScript.valueToCode(block, 'FILL?', Blockly.JavaScript.ORDER_ATOMIC);
  var f = value_fill.slice(1,-1);
  var value_color = Blockly.JavaScript.valueToCode(block, 'RGB_COLOR', Blockly.JavaScript.ORDER_ATOMIC);
  var rgb = value_color.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var r=rgb[0];
  var g=rgb[1];
  var b=rgb[2];

  // Assemble XML
  var xmlTop, xmlBottom, xmlFill;
  if (firstBlock){
    xmlTop = '<block '
    xmlBottom = '</block>'
    firstBlock = false;
  } else {
    xmlTop = '<next><block '
    xmlBottom = '</block></next>'
  }
  if (f=='true'){
    xmlFill = 1;
  } else {
    xmlFill = 0;
  }
  xmlTop += `type="DISPLAY:DRAW_OVAL_TO"><value name="0"><block type="get"><field name="name">screen</field></block></value><value name="1"><block type="EXTENDED:TUPLE" inline="true"><value name="0"><block type="integer"><field name="value">${x}</field></block></value><value name="1"><block type="integer"><field name="value">${y}</field></block></value></block></value><value name="2"><block type="EXTENDED:TUPLE" inline="true"><value name="0"><block type="integer"><field name="value">${w}</field></block></value><value name="1"><block type="integer"><field name="value">${h}</field></block></value></block></value><value name="3"><block type="bool"><field name="value">${xmlFill}</field></block></value><value name="4"><block type="RGBLED:COLOR" inline="true"><value name="0"><block type="integer"><field name="value">${r}</field></block></value><value name="1"><block type="integer"><field name="value">${g}</field></block></value><value name="2"><block type="integer"><field name="value">${b}</field></block></value></block></value>`
  xmlCode = xmlCode + xmlTop;
  xmlEndCode = xmlBottom + xmlEndCode

  // Assemble javascript into code variable.
  var code = `createOval(${x},${y},${w},${h},${r},${g},${b},${f})\n`;
  return code;
};




Blockly.JavaScript['tw_draw_triangle'] = function(block) {
  var value_corner1 = Blockly.JavaScript.valueToCode(block, 'CORNER1', Blockly.JavaScript.ORDER_ATOMIC);
  var xy1 = value_corner1.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var x1 = parseInt(xy1[0]);
  var y1 = parseInt(xy1[1]);
  var value_corner2 = Blockly.JavaScript.valueToCode(block, 'CORNER2', Blockly.JavaScript.ORDER_ATOMIC);
  var xy2 = value_corner2.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var x2 = parseInt(xy2[0]);
  var y2 = parseInt(xy2[1]);
  var value_corner3 = Blockly.JavaScript.valueToCode(block, 'CORNER3', Blockly.JavaScript.ORDER_ATOMIC);
  var xy3 = value_corner3.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var x3 = parseInt(xy3[0]);
  var y3 = parseInt(xy3[1]);
  var value_fill = Blockly.JavaScript.valueToCode(block, 'FILL', Blockly.JavaScript.ORDER_ATOMIC);
  var f = value_fill.slice(1,-1);
  var value_color = Blockly.JavaScript.valueToCode(block, 'RGB_COLOR', Blockly.JavaScript.ORDER_ATOMIC);
  var rgb = value_color.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var r=rgb[0];
  var g=rgb[1];
  var b=rgb[2];

  // Assemble XML
  var xmlTop, xmlBottom, xmlFill;
  if (firstBlock){
    xmlTop = '<block '
    xmlBottom = '</block>'
    firstBlock = false;
  } else {
    xmlTop = '<next><block '
    xmlBottom = '</block></next>'
  }
  if (f=='true'){
    xmlFill = 1;
  } else {
    xmlFill = 0;
  }
  xmlTop += `type="DISPLAY:DRAW_TRIANGLE_TO"><value name="0"><block type="get"><field name="name">screen</field></block></value><value name="1"><block type="EXTENDED:TUPLE" inline="true"><value name="0"><block type="integer"><field name="value">${x1}</field></block></value><value name="1"><block type="integer"><field name="value">${y1}</field></block></value></block></value><value name="2"><block type="EXTENDED:TUPLE" inline="true"><value name="0"><block type="integer"><field name="value">${x2}</field></block></value><value name="1"><block type="integer"><field name="value">${y2}</field></block></value></block></value><value name="3"><block type="EXTENDED:TUPLE" inline="true"><value name="0"><block type="integer"><field name="value">${x3}</field></block></value><value name="1"><block type="integer"><field name="value">${y3}</field></block></value></block></value><value name="4"><block type="bool"><field name="value">${xmlFill}</field></block></value><value name="5"><block type="RGBLED:COLOR" inline="true"><value name="0"><block type="integer"><field name="value">${r}</field></block></value><value name="1"><block type="integer"><field name="value">${g}</field></block></value><value name="2"><block type="integer"><field name="value">${b}</field></block></value></block></value>`
  xmlCode = xmlCode + xmlTop;
  xmlEndCode = xmlBottom + xmlEndCode

  // Assemble javascript into code variable.
  var code = `createTriangle(${x1},${y1},${x2},${y2},${x3},${y3},${r},${g},${b},${f})\n`;
  return code;
};


Blockly.JavaScript['tw_draw_line'] = function(block) {
  var value_point1 = Blockly.JavaScript.valueToCode(block, 'POINT1', Blockly.JavaScript.ORDER_ATOMIC);
  var xy1 = value_point1.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var x1 = parseInt(xy1[0]);
  var y1 = parseInt(xy1[1]);
  var value_point2 = Blockly.JavaScript.valueToCode(block, 'POINT2', Blockly.JavaScript.ORDER_ATOMIC);
  var xy2 = value_point2.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var x2 = parseInt(xy2[0]);
  var y2 = parseInt(xy2[1]);
  var value_thickness = Blockly.JavaScript.valueToCode(block, 'THICKNESS', Blockly.JavaScript.ORDER_ATOMIC);
  var thick = value_thickness;
  var value_color = Blockly.JavaScript.valueToCode(block, 'RGB_COLOR', Blockly.JavaScript.ORDER_ATOMIC);
  var rgb = value_color.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var r=rgb[0];
  var g=rgb[1];
  var b=rgb[2];

  // Assemble XML
  var xmlTop, xmlBottom;
  if (firstBlock){
    xmlTop = '<block '
    xmlBottom = '</block>'
    firstBlock = false;
  } else {
    xmlTop = '<next><block '
    xmlBottom = '</block></next>'
  }
  xmlTop += `type="DISPLAY:DRAW_LINE_TO"><value name="0"><block type="get"><field name="name">screen</field></block></value><value name="1"><block type="EXTENDED:TUPLE" inline="true"><value name="0"><block type="integer"><field name="value">${x1}</field></block></value><value name="1"><block type="integer"><field name="value">${y1}</field></block></value></block></value><value name="2"><block type="EXTENDED:TUPLE" inline="true"><value name="0"><block type="integer"><field name="value">${x2}</field></block></value><value name="1"><block type="integer"><field name="value">${y2}</field></block></value></block></value><value name="3"><block type="integer"><field name="value">${thick}</field></block></value><value name="4"><block type="RGBLED:COLOR" inline="true"><value name="0"><block type="integer"><field name="value">${r}</field></block></value><value name="1"><block type="integer"><field name="value">${g}</field></block></value><value name="2"><block type="integer"><field name="value">${b}</field></block></value></block></value>`
  xmlCode = xmlCode + xmlTop;
  xmlEndCode = xmlBottom + xmlEndCode

  // Assemble javascript into code variable.
  var code = `createLine(${x1},${y1},${x2},${y2},${thick},${r},${g},${b})\n`;
  return code;
};


Blockly.JavaScript['tw_write_text'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var textContents = value_text.slice(1,-1);
  var value_xy = Blockly.JavaScript.valueToCode(block, 'XY', Blockly.JavaScript.ORDER_ATOMIC);
  var xy = value_xy.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var x = parseInt(xy[0]);
  var y = parseInt(xy[1]);
  var value_text_size = Blockly.JavaScript.valueToCode(block, 'TEXT_SIZE', Blockly.JavaScript.ORDER_ATOMIC);
  var size = value_text_size.slice(1,-1);
  var value_color = Blockly.JavaScript.valueToCode(block, 'RGB_COLOR', Blockly.JavaScript.ORDER_ATOMIC);
  var rgb = value_color.slice(1,-1).split(' ') // get rid of parentheses and make into array
  var r=rgb[0];
  var g=rgb[1];
  var b=rgb[2];

  // Assemble XML
  var xmlTop, xmlBottom, code;
  if (firstBlock){
    xmlTop = '<block '
    xmlBottom = '</block>'
    firstBlock = false;
  } else {
    xmlTop = '<next><block '
    xmlBottom = '</block></next>'
  }
  // convert the drop-down font size to XML choice
  switch(size) {
    case "7":
      code = 0
      break;
    case "9":
      code = 1
      break;
    case "12":
      code = 2
      break;
    case "20":
      code = 3
      break;
    case "27":
      code = 4
      break;
    default:
      code = "0"
  }
  xmlTop += `type="EXTENDED:WRITE_TEXT_WRAP"><value name="0"><block type="get"><field name="name">screen</field></block></value><value name="1"><block type="string"><field name="value">${textContents}</field></block></value><value name="2"><block type="EXTENDED:TUPLE" inline="true"><value name="0"><block type="integer"><field name="value">${x}</field></block></value><value name="1"><block type="integer"><field name="value">${y}</field></block></value></block></value><value name="3"><block type="DISPLAY:WIDGET_SIZE_CHOICES"><field name="value">${code}</field></block></value><value name="4"><block type="RGBLED:COLOR" inline="true"><value name="0"><block type="integer"><field name="value">${r}</field></block></value><value name="1"><block type="integer"><field name="value">${g}</field></block></value><value name="2"><block type="integer"><field name="value">${b}</field></block></value></block></value>`
  xmlCode = xmlCode + xmlTop;
  xmlEndCode = xmlBottom + xmlEndCode

  // Assemble javascript into code variable.
  var code = `createText(${x},${y},${textContents},${size},${r},${g},${b})\n`;
  return code;
};


Blockly.JavaScript['tw_tuple'] = function(block) {
  var value_arg0 = Blockly.JavaScript.valueToCode(block, 'ARG0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_arg1 = Blockly.JavaScript.valueToCode(block, 'ARG1', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = value_arg0+' '+value_arg1;  // return value is string -- must be sliced and split when received
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['tw_tf_input'] = function(block) {
  var dropdown_true_false = block.getFieldValue('TRUE_FALSE');
  // TODO: Assemble javascript into code variable.
  if (dropdown_true_false == "TRUE"){
    var code = 'true';
  }else{
    var code = 'false';
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['tw_text_input'] = function(block) {
  var text_text_input = block.getFieldValue('TEXT_INPUT');
  // TODO: Assemble javascript into code variable.
  var code = `"${text_text_input}"`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['tw_text_size_input'] = function(block) {
  var dropdown_text_size = block.getFieldValue('TEXT_SIZE');
  // TODO: Assemble javascript into code variable.
  switch(dropdown_text_size) {
    case "x_small_text":
      var code = "7"
      break;
    case "small_text":
      var code = "9"
      break;
    case "medium_text":
      var code = "12"
      break;
    case "large_text":
      var code = "20"
      break;
    case "x_large_text":
      var code = "27"
      break;
    default:
      var code = "7"
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

/* match text size to number used
<option value="7">X Small</option>
<option value="9">Small</option>
<option value="12">Medium</option>
<option value="20">Large</option>
<option value="27">X Large</option>
*/



Blockly.JavaScript['tw_pseudo_subroutine'] = function(block) {
  var statements_code_blocks = Blockly.JavaScript.statementToCode(block, 'CODE_BLOCKS');
  // TODO: Assemble javascript into code variable.
  var code = statements_code_blocks;
  return code;
};





