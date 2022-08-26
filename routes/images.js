const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const express = require("express");
const router = express.Router();

const formidable = require("express-formidable");
router.use(formidable());

const Image = require("../models/Image");

router.get("/images", async (req, res) => {
  try {
    const allImages = await Image.find();
    res.json(allImages);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.post("/upload/image", async (req, res) => {
  try {
    console.log(req.fields);
    if (req.files.image) {
      let imageToUpload = req.files.image.path;

      const result = await cloudinary.uploader.upload(imageToUpload);

      const newImage = new Image({
        image_index: Number(req.fields.index),
        image_title: req.fields.title,
        image: result.secure_url,
      });

      await newImage.save();

      res.json(newImage);
    } else {
      res.json({ message: "Veuillez selectionner une image" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/delete/image", async (req, res) => {
  try {
    const deleteImage = await Image.deleteOne({
      _id: req.fields._id,
    });

    res.json(deleteImage);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.post("/reorder/image", async (req, res) => {
  try {
    const images = JSON.parse(req.fields.images);

    const promise = images.map(async (image) => {
      console.log(image);
      const imageUpdate = await Image.findByIdAndUpdate(
        image._id,
        { image_index: image.image_index },
        { new: true }
      );
    });

    Promise.all(promise)
      .then(() => {
        res.json("update order success");
      })
      .catch((error) => {
        res.json({ message: "update order fail", error: error.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
