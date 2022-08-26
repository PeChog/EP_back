require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const express = require("express");

const cors = require("cors");

const app = express();
app.use(cors());

const pdfRoutes = require("./routes/pdf");
app.use(pdfRoutes);

const authentificationRoutes = require("./routes/authentification");
app.use(authentificationRoutes);

const expositionsRoutes = require("./routes/expositions");
app.use(expositionsRoutes);

const imagesRoutes = require("./routes/images");
app.use(imagesRoutes);

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable ! 🦒");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});
