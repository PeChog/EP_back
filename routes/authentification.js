const express = require("express");
const router = express.Router();

const formidable = require("express-formidable");
router.use(formidable());

router.post("/auth", async (req, res) => {
  const { email, password } = req.fields;
  console.log(email, password);
  try {
    const emailCheck = "eliott@eliott";
    const passwordCheck = "12345";

    if (email && password) {
      if (email === emailCheck && password === passwordCheck) {
        res.json({
          token: 1234567890,
        });
      } else {
        res.json({ message: "Erreur email ou mot de passe" });
      }
    } else {
      res.json({ message: "Veuillez renseigner les champs demandés" });
    }
  } catch (error) {
    res.status(400).json({ message: "Username doesn't exist" });
  }
});

// app.post("/create/user", async (req, res) => {
//   try {
//     console.log(req.fields);

//     const newUser = new User({
//       email: req.fields.email,
//       password: req.fields.password,
//     });
//     await newUser.save();
//     res.json(newUser);
//   } catch (error) {
//     res.status(400).json({ error: { message: error.message } });
//   }
// });
module.exports = router;
