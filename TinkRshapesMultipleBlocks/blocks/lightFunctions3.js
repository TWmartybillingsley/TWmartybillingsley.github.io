var internalVarCounter = 0;

const SET_TIMEOUT_START = 'setTimeout(function () {'
const SET_TIMEOUT_END = '}, 0);\n'
var timeout_end_stack = ''

function add_to_timeout_end_stack(ms){
	timeout_end_stack = '},' + ms + ');\n' + timeout_end_stack;
}

function manual_add_to_timeout_end_stack(endCode){
  timeout_end_stack = endCode +'\n' + timeout_end_stack;
}

Blockly.JavaScript['setmultiplepixels'] = function(block) {
  var value_rgb_color = Blockly.JavaScript.valueToCode(block, 'RGB_COLOR', Blockly.JavaScript.ORDER_ATOMIC);
  var value_start = Blockly.JavaScript.valueToCode(block, 'START', Blockly.JavaScript.ORDER_ATOMIC);
  var value_end = Blockly.JavaScript.valueToCode(block, 'END', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  rgb_color_List = value_rgb_color.slice(1,-1);
  var code = SET_TIMEOUT_START + 'blocklySetLotsOfLights('+value_start+','+ value_end + ',' + rgb_color_List + ');'  +'\n';
  add_to_timeout_end_stack(0);
  return code;
};


Blockly.JavaScript['setonepixel'] = function(block) {
  var value_pixelnum = Blockly.JavaScript.valueToCode(block, 'PIXEL_NUM', Blockly.JavaScript.ORDER_ATOMIC);
  var value_rgb_color = Blockly.JavaScript.valueToCode(block, 'RGB_COLOR', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  rgb_color_List = value_rgb_color.slice(1,-1);
  var code = SET_TIMEOUT_START + 'blocklySetOneLight(' + value_pixelnum+ ','+ rgb_color_List + ',);' +  '\n';
  add_to_timeout_end_stack(0);
  return code;
};


Blockly.JavaScript['newlightstrand'] = function(block) {
  var value_light_count = Blockly.JavaScript.valueToCode(block, 'LIGHT_COUNT', Blockly.JavaScript.ORDER_ATOMIC);
  // Assemble JavaScript into code variable.
  var code = SET_TIMEOUT_START + 'blocklyMakeLights('+value_light_count+');' +  '\n';
  add_to_timeout_end_stack(0);
  return code;
};

Blockly.JavaScript['pixelcolor'] = function(block) {
  var value_red = Blockly.JavaScript.valueToCode(block, 'RED', Blockly.JavaScript.ORDER_ATOMIC);
  var value_green = Blockly.JavaScript.valueToCode(block, 'GREEN', Blockly.JavaScript.ORDER_ATOMIC);
  var value_blue = Blockly.JavaScript.valueToCode(block, 'BLUE', Blockly.JavaScript.ORDER_ATOMIC);
  // Assemble JavaScript into code variable.
  var code = '['+value_red+','+value_green+','+value_blue+']';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['delay_block'] = function(block) {
  var value_delay_milliseconds = Blockly.JavaScript.valueToCode(block, 'DELAY_MILLISECONDS', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = SET_TIMEOUT_START + 'var x = 1;\n';
  add_to_timeout_end_stack(value_delay_milliseconds);
  return code;
};

Blockly.JavaScript['repeat_loop'] = function(block) {
  var internalVar = 'internalVar'+internalVarCounter;
  internalVarCounter++
  add_to_timeout_end_stack(0);
  manual_add_to_timeout_end_stack('}//end of loop')
  add_to_timeout_end_stack(0);
  var value_repeat_num_times = Blockly.JavaScript.valueToCode(block, 'REPEAT_NUM_TIMES', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_repeat_loop_statements = Blockly.JavaScript.statementToCode(block, 'REPEAT_LOOP_STATEMENTS');

  // TODO: Assemble JavaScript into code variable.
  var code = SET_TIMEOUT_START +'for (var ' + internalVar + ' = 0; ' + internalVar + ' < ' + value_repeat_num_times +'; ' + internalVar + '++){\n'+SET_TIMEOUT_START+'\n'+statements_repeat_loop_statements+'\n';
  return code;
};