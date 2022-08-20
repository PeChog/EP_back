const mongoose = require("mongoose");

const Image = mongoose.model("Image", {
  image_index: Number,

  image_title: String,
  image: Object,
});

module.exports = Image;
