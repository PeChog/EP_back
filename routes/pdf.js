const fs = require("fs");

const express = require("express");
const router = express.Router();

const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "pdfBucket",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: Storage }).single("Pdf");

const Pdf = require("../models/Pdf");

// router.get("/read/pdf", async (req, res) => {
//   try {
//     const pdfList = await Pdf.find();
//     res.json(pdfList);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// });

router.post("/upload/pdf", async (req, res) => {
  try {
    const pdfToUpdate = await Pdf.find();

    fs.unlink(`./pdfBucket/${pdfToUpdate[0].title}`, (error) => {
      if (error) {
        console.log(error);
      }
    });
    upload(req, res, async (error) => {
      if (error) {
        console.log(error);
      } else {
        const updateBrochure = pdfToUpdate[0];

        updateBrochure.title = req.file.filename;

        updateBrochure.brochure = {
          data: req.file.filename,
          contentType: "application/pdf",
        };

        updateBrochure.save();

        res.json("updateBrochure");
      }
    });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
    console.log(error);
  }
});

router.get("/download/pdf", async (req, res) => {
  try {
    const pdfList = await Pdf.find();

    res.download(`./pdfBucket/${pdfList[0].title}`);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
