const mongoose = require("mongoose");

const Exposition = mongoose.model("Exposition", {
  exposition_index: Number,

  expo_date: String,
  expo_description: String,
  timeStamp: Number,
});

module.exports = Exposition;
