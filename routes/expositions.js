const express = require("express");
const router = express.Router();

const formidable = require("express-formidable");
router.use(formidable());

const Exposition = require("../models/Exposition");

//une deuxième route en GET pour lister tous les expositions
router.get("/expositions", async (req, res) => {
  try {
    const allExpositions = await Exposition.find();
    res.json(allExpositions);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

//une première route en POST pour créer une exposition
router.post("/create/exposition", async (req, res) => {
  try {
    const { date, description, index } = req.fields;
    console.log(req.fields);
    if (description) {
      const newExposition = new Exposition({
        exposition_index: index,
        expo_description: description,
        timeStamp: Date.now(),
      });
      if (date) {
        newExposition.expo_date = date;
      }

      await newExposition.save();

      res.json(newExposition);
    } else {
      res.json({ message: "un des champs est vide" });
    }
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.post("/delete/exposition", async (req, res) => {
  console.log(req.fields);
  try {
    const deleteExposition = await Exposition.deleteOne({
      _id: req.fields._id,
    });

    res.json(deleteExposition);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.post("/reorder/expositions", async (req, res) => {
  try {
    const expositions = JSON.parse(req.fields.expositions);

    const promise = expositions.map(async (exposition) => {
      console.log(exposition);
      const expositionToUpdate = await Exposition.findByIdAndUpdate(
        exposition._id,
        { exposition_index: exposition.exposition_index },
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
