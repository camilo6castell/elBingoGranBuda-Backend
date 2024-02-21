const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
var bcrypt = require("bcryptjs");

dotenv.config();

const userSchema = require("../models/users");

// USERS LOGIN

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email: email });
  console.log(user);
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        session: user,
      });
    } else {
      res.status(401).json({
        code: 401,
        message: "Verifica tu información y vuelve a intentarlo",
      });
    }
  } else {
    res.status(404).json({
      code: 404,
      message: "El usuario no existe, por favor registrese",
    });
  }
});

// USER SINGUP

router.post("/registry", async (req, res) => {
  const { email, password } = req.body;
  const userT = await userSchema.find({ email: email }).exec();
  if (userT.length == 0) {
    const newUser = new userSchema({ email, password });
    await newUser.save();
    res.status(201).json({
      code: 201,
      message: "El usuario ha sido creado, ahora puede iniciar sesión",
    });
  } else {
    res.status(302).json({
      code: 302,
      message: "El usuario ya existe, por favor inicie sesión",
    });
  }
});

router.post("/bingoboard", async (req, res) => {
  const { email, bingoboard } = req.body;
  try {
    const user = await userSchema.findOne({ email: email });
    console.log(user.bingoboard.B);
    if (user.bingoboard.B.length == 0) {
      user.bingoboard = bingoboard;
      await userSchema.findByIdAndUpdate(user._id, user);
      res.status(404).json({
        code: 404,
        user: user,
      });
    } else {
      res.status(200).json({
        code: 200,
        user: user,
      });
    }
  } catch (error) {
    console.log("Error en la db guardando cartón: ", error);
  }
});

router.post("/isongame", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await userSchema.findOne({ email: email });
    if (user.bingoboard.B.length == 0) {
      res.status(404).json({
        code: 404,
        isongame: false,
      });
    } else {
      res.status(200).json({
        code: 200,
        isongame: true,
      });
    }
  } catch (error) {
    console.log("Error en la db guardando cartón: ", error);
  }
});

// DELETE BOARD

router.post("/deleteboard", async (req, res) => {
  const email = req.body.email;
  try {
    let user = await userSchema.findOne({ email: email });
    user.bingoboard = { B: [], I: [], N: [], G: [], O: [] };
    await userSchema.findByIdAndUpdate(user._id, user);
    console.log("Tablero eliminado");
    res.status(200).json({
      code: 200,
    });
  } catch (error) {
    console.log("Error al resetear game: ", error);
  }
});

module.exports = router;
