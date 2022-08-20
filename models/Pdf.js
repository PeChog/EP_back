const mongoose = require("mongoose");

const Pdf = mongoose.model("Pdf", {
  document: { type: Buffer },
});

module.exports = Pdf;
