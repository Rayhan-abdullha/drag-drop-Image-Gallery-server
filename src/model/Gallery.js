const { Schema, model } = require("mongoose");

const ImageSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = new model("Gallery", ImageSchema);
module.exports = Gallery;
