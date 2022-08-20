require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const express = require("express");
const formidable = require("express-formidable");

const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

const authentificationRoutes = require("./routes/authentification");
app.use(authentificationRoutes);

const expositionsRoutes = require("./routes/expositions");
app.use(expositionsRoutes);

const imagesRoutes = require("./routes/images");
app.use(imagesRoutes);

app.post("/upload/pdf", async (req, res) => {
  console.log(req.files.pdfFile._writeStream.bytesWritten);
  try {
    // const newPdf = new Pdf({
    //   document: req.files.pdfFile._writeStream,
    // });

    // await newPdf.save();

    res.json("newPdf");
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable ! 🦒");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});
