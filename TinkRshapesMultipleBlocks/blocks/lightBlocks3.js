// Lights: New Light Strand
Blockly.Blocks['newlightstrand'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("New Light Strand");
    this.appendValueInput("LIGHT_COUNT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Light Count:");
    this.setInputsInline(false);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("this is a tootip");
 this.setHelpUrl("");
  }
};


// Lights: Set Multiple Pixels
Blockly.Blocks['setmultiplepixels'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set Multiple Lights");
    this.appendValueInput("RGB_COLOR")
        .setCheck("rgbColor")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color:");
    this.appendValueInput("START")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Start:");
    this.appendValueInput("END")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("End:");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Lights: Set One Pixel
Blockly.Blocks['setonepixel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set Light Color");
    this.appendValueInput("PIXEL_NUM")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Pixel Number:");
    this.appendValueInput("RGB_COLOR")
        .setCheck("rgbColor")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Lights: Color
Blockly.Blocks['pixelcolor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Color");
    this.appendValueInput("RED")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("red");
    this.appendValueInput("GREEN")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("green");
    this.appendValueInput("BLUE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("blue");
    this.setInputsInline(false);
    this.setOutput(true, "rgbColor");
    this.setColour(180);
 this.setTooltip("choose a color");
 this.setHelpUrl("");
  }
};

// Time: Delay (milliseconds)
Blockly.Blocks['delay_block'] = {
  init: function() {
    this.appendValueInput("DELAY_MILLISECONDS")
        .setCheck("Number")
        .appendField("Delay (milliseconds):");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


// Loops: Repeat # Times
Blockly.Blocks['repeat_loop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Repeat");
    this.appendValueInput("REPEAT_NUM_TIMES")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("Times");
    this.appendStatementInput("REPEAT_LOOP_STATEMENTS")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

