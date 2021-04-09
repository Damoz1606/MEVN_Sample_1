const { Schema, model } = require("mongoose");

const tutorial_schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    published: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Tutorial", tutorial_schema);
