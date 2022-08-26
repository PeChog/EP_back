const mongoose = require("mongoose");

const Pdf = mongoose.model("Pdf", {
  title: String,
  brochure: { data: Buffer, contentType: String },
});

module.exports = Pdf;
