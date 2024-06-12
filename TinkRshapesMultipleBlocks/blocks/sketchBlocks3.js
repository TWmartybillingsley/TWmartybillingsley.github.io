

Blockly.Blocks['tw_color'] = {
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
    this.setInputsInline(true);
    this.setOutput(true, "rgbColor");
    this.setColour(180);
 this.setTooltip("choose a color");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['tw_fill_new_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Fill New Color");
    this.appendValueInput("RGB_COLOR")
        .setCheck("rgbColor")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['tw_draw_rectangle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Draw Rectangle");
    this.appendValueInput("XY")
        .setCheck("tuple")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("X, Y:");
    this.appendValueInput("WIDTH_HEIGHT")
        .setCheck("tuple")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Width, Height:");
    this.appendValueInput("FILL?")
        .setCheck("Boolean")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Fill ?:");
    this.appendValueInput("RGB_COLOR")
        .setCheck("rgbColor")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
 this.setTooltip("x,y is the center of the rectangle");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['tw_draw_oval'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Draw Oval");
    this.appendValueInput("XY")
        .setCheck("tuple")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("X, Y:");
    this.appendValueInput("WIDTH_HEIGHT")
        .setCheck("tuple")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Width, Height:");
    this.appendValueInput("FILL?")
        .setCheck("Boolean")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Fill ?:");
    this.appendValueInput("RGB_COLOR")
        .setCheck("rgbColor")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
 this.setTooltip("x,y is the center of the oval");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['tw_draw_triangle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Draw Triangle");
    this.appendValueInput("CORNER1")
        .setCheck("tuple")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Corner 1 (X, Y):");
    this.appendValueInput("CORNER2")
        .setCheck("tuple")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Corner 2 (X, Y):");
    this.appendValueInput("CORNER3")
        .setCheck("tuple")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Corner 3 (X, Y):");
    this.appendValueInput("FILL")
        .setCheck("Boolean")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Fill ?:");
    this.appendValueInput("RGB_COLOR")
        .setCheck("rgbColor")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
 this.setTooltip("specify the x,y location of each corner of the triangle");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['tw_draw_line'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Draw Line");
    this.appendValueInput("POINT1")
        .setCheck("tuple")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Point 1 (X, Y):");
    this.appendValueInput("POINT2")
        .setCheck("tuple")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Point 2 (X, Y):");
    this.appendValueInput("THICKNESS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Thickness:");
    this.appendValueInput("RGB_COLOR")
        .setCheck("rgbColor")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
 this.setTooltip("draw a line from point1 to point2");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['tw_write_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Write Text");
    this.appendValueInput("TEXT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Text:");
    this.appendValueInput("XY")
        .setCheck("tuple")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("X, Y:");
    this.appendValueInput("TEXT_SIZE")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Size:");
    this.appendValueInput("RGB_COLOR")
        .setCheck("rgbColor")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
 this.setTooltip("x,y is the upper-left corner of the text");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['tw_tuple'] = {
  init: function() {
    this.appendValueInput("ARG0")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Arg 0:");
    this.appendValueInput("ARG1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Arg 1:");
    this.setInputsInline(true);
    this.setOutput(true, "tuple");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['tw_tf_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["True","TRUE"], ["False","FALSE"]]), "TRUE_FALSE");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour("#FFFF00");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['tw_text_input'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("\"");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("Hello, World!"), "TEXT_INPUT");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("\"");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour(100);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['tw_text_size_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["X Small","x_small_text"], ["Small","small_text"], ["Medium","medium_text"], ["Large","large_text"], ["X Large","x_large_text"]]), "TEXT_SIZE");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};




Blockly.Blocks['tw_pseudo_subroutine'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Code:");
    this.appendStatementInput("CODE_BLOCKS")
        .setCheck(null);
    this.setInputsInline(false);
    this.setDeletable (false);
    this.setColour(199);
 this.setTooltip("code blocks put here will be turned into a subroutine called drawBackground in TinkRcode");
 this.setHelpUrl("");
  }
};













