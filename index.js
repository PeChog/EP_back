const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

mongoose.connect("mongodb://localhost/EliottPaquet");

const app = express();
app.use(formidable());
app.use(cors());

cloudinary.config({
  cloud_name: "pecloud",
  api_key: "556818625233177",
  api_secret: "j6JOOr5Ym_EZ3U1sSbt-j-wUTDY",
});

// const exRoutes = require("./routes/users");
// app.use(userRoutes);

// const offerRoutes = require("./routes/offers");
// app.use(offerRoutes);
const expositions = [];

const Exposition = mongoose.model("Exposition", {
  expo_date: String,
  expo_description: String,
});

const User = mongoose.model("User", {
  email: String,
  password: String,
});

const Image = mongoose.model("Image", {
  image_title: String,
  image: Object,
});

const Pdf = mongoose.model("Pdf", {
  document: String,
});

app.post("/auth", async (req, res) => {
  try {
    const email = "eliott@eliott";
    const password = "12345";

    res.json({
      token: 1234567890,
    });
  } catch (error) {
    res.status(400).json({ message: "Username doesn't exist" });
  }
});
app.post("/create/user", async (req, res) => {
  try {
    console.log(req.fields);

    const newUser = new User({
      email: req.fields.email,
      password: req.fields.password,
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

app.post("/upload/image", async (req, res) => {
  try {
    let imageToUpload = req.files.image.path;

    const result = await cloudinary.uploader.upload(imageToUpload);

    const newImage = new Image({
      image: result.secure_url,
    });
    await newImage.save();
    res.json(newImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.post("/delete/image", async (req, res) => {
  try {
    const deleteImage = await Image.deleteOne({
      _id: req.fields._id,
    });

    res.json(deleteImage);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

app.get("/image", async (req, res) => {
  try {
    const allImages = await Image.find();
    res.json(allImages);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

//une première route en POST pour créer une exposition
app.post("/create/exposition", async (req, res) => {
  try {
    console.log(req.fields);

    const newExposition = new Exposition({
      expo_date: req.fields.expo_date,
      expo_description: req.fields.expo_description,
    });
    await newExposition.save();
    res.json(newExposition);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

app.post("/delete/exposition", async (req, res) => {
  try {
    const deleteExposition = await Image.deleteOne({
      _id: req.fields._id,
    });

    res.json(deleteExposition);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

app.post("/upload/pdf", async (req, res) => {
  try {
    console.log(req.file);

    const newPdf = new Pdf({
      document: req.files,
    });
    await newPdf.save();
    res.json(newPdf);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

app.post("/delete/exposition", async (req, res) => {
  try {
    const deleteExposition = await Exposition.deleteOne({
      _id: req.fields._id,
    });

    res.json(deleteExposition);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

//une deuxième route en GET pour lister tous les expositions
app.get("/expositions", async (req, res) => {
  try {
    const allExpositions = await Exposition.find();
    res.json(allExpositions);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

//une première route en POST pour ajouter une image
app.post("/add/image", async (req, res) => {
  try {
    console.log(req.fields);

    const newImage = new Image({
      image_title: req.fields.image_title,
      image: req.fields.image,
    });
    await newImage.save();
    res.json(newImage);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

//une deuxième route en GET pour lister toutes les images
app.get("/images", async (req, res) => {
  try {
    const allImages = await Image.find();
    res.json(allImages);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable !");
});

app.listen(3000, () => {
  console.log("Server has started");
});
