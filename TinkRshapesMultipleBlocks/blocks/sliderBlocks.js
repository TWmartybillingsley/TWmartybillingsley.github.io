

Blockly.Blocks["num_slider_0_255"] = {
  init: function () {
    this.appendDummyInput()
    	.appendField(new Blockly.FieldImage("blocks/sliderIcon2.png", 24, 12, { alt: "slider", flipRtl: "FALSE" }))
      .appendField(new FieldSlider(0, 0, 255), "FIELDSLIDER");
    this.setOutput(true, "Number");
    this.setColour(225);
  }
};


Blockly.JavaScript['num_slider_0_255'] = function(block) {
  var value_sliderVal = parseInt(block.getFieldValue('FIELDSLIDER'));
  // TODO: Assemble JavaScript into code variable.
  var code = value_sliderVal;
  return [code, Blockly.JavaScript.ORDER_NONE];
};