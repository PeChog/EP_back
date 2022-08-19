const mongoose = require("mongoose");

const Image = mongoose.model("Image", {
  image: String,
});

module.exports = Image;
