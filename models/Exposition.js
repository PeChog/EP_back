const mongoose = require("mongoose");

const Exposition = mongoose.model("Exposition", {
  expo_date: String,
  expo_description: String,
});

module.exports = Exposition;
