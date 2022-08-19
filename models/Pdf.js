const mongoose = require("mongoose");

const Pdf = mongoose.model("Pdf", {
  document: String,
});

module.exports = Pdf;
