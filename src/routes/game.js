const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

// MODELOS DE MONGOOSE

const gameSchema = require("../models/game");
const userSchema = require("../models/users");

// CLASE USER

const User = require("../classes/user");

// GAME STATE

router.get("/", async (req, res) => {
  try {
    const game = await gameSchema.findOne({ name: "game" });
    if (game.ongame) {
      res.status(200).json({
        code: 200,
        ongame: true,
      });
    } else {
      res.status(404).json({
        code: 404,
        ongame: false,
      });
    }
  } catch (error) {
    console.log("Error en la base de datos: ", error);
  }
});

// ADDING USERS TO LOBBY FOR GAME TO START

router.post("/", async (req, res) => {
  const email = req.body.email;
  try {
    const game = await gameSchema.findOne({ name: "game" });
    if (game.users.includes(email)) {
      res.status(201).json({
        code: 200,
      });
    } else {
      await game.users.push(email);
      await gameSchema.findByIdAndUpdate(game._id, game);
      res.status(201).json({
        code: 200,
      });
    }
  } catch (error) {
    console.log(
      "Error en agregar usuario, no se pudo recuperar el usuario de la DB",
      error
    );
  }
});

// GETPLAYERS && isWinner? ********************

router.get("/lobby", async (req, res) => {
  try {
    const game = await gameSchema.findOne({ name: "game" });
    res.status(201).json({
      code: 200,
      players: game.users,
      iswinner: game.iswinner,
      winner: game.winner,
      ballotsongame: game.ballotsongame,
    });
  } catch (error) {
    console.log(
      "Error en agregar usuario, no se pudo recuperar el usuario de la DB",
      error
    );
  }
});

// START GAME = true

router.post("/start", async (req, res) => {
  try {
    const game = await gameSchema.findOne({ name: "game" });
    if (!game.ongame) {
      game.ongame = true;
      await gameSchema.findByIdAndUpdate(game._id, game);
      res.status(201).json({
        code: 200,
      });
    } else {
      res.status(201).json({
        code: 200,
      });
    }
  } catch (error) {
    res.status(404).json({
      code: 404,
    });
    console.log(
      "Error en agregar usuario, no se pudo recuperar el usuario de la DB",
      error
    );
  }
});

// REMOVE PLAYERS

router.post("/removeplayer", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await userSchema.findOne({ email: email });
    user.bingoboard = { B: [], I: [], N: [], G: [], O: [] };

    await userSchema.findByIdAndUpdate(user._id, user);
    const game = await gameSchema.findOne({ name: "game" });

    if (game.users.includes(email)) {
      const index = game.users.indexOf(email);
      game.users.splice(index, 1);
      console.log("lista modificada", game.users);
      await gameSchema.findByIdAndUpdate(game._id, game);
      res.status(200).json({
        code: 200,
        user: user,
      });
    } else {
      res.status(400).json({
        code: 400,
        user: user,
      });
    }
  } catch (error) {
    console.log("Error en la db guardando cartón: ", error);
  }
});

// CHECK WINNER

router.post("/iswinner", async (req, res) => {
  const { email, board, ballotsongame } = req.body;
  const userIsWinner = new User(email, board);
  // console.log(userIsWinner);
  if (userIsWinner.checkWinningNumbers(ballotsongame)) {
    try {
      const game = await gameSchema.findOne({ name: "game" });
      game.iswinner = true;
      game.winner = email;
      await gameSchema.findByIdAndUpdate(game._id, game);
      res.status(200).json({
        code: 200,
      });
    } catch (error) {
      console.log("Error al guardar ganador", error);
    }
  } else {
    res.status(400).json({
      code: 400,
    });
  }
});

// RESET GAME

router.post("/resetgame", async (req, res) => {
  try {
    let game = await gameSchema.findOne({ name: "game" });
    console.log("intento de reset", game);
    if (game.ongame) {
      game.ongame = false;
      game.ballots = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
        57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
        75,
      ];
      game.ballotsongame = [];
      game.iswinner = false;
      game.winner = "";
      game.users = [];
      await gameSchema.findByIdAndUpdate(game._id, game);
      console.log("Game reseteado!!!!!------------");
      res.status(200).json({
        code: 200,
      });
    }
  } catch (error) {
    console.log("Error al resetear game: ", error);
  }
});

router.post("/getballot", async (req, res) => {
  const { email } = req.body;
  try {
    const game = await gameSchema.findOne({ name: "game" });

    const users = game.users;
    const firtsUser = users[0];

    if (firtsUser == email) {
      // recuperar data de game
      const ballots = game.ballots;
      const ballotsongame = game.ballotsongame;

      // get balota
      const randomIndex = Math.floor(Math.random() * ballots.length);
      const ballot = ballots[randomIndex];

      // modificar data de game
      ballots.splice(randomIndex, 1);
      game.ballots = ballots;
      game.ballotsongame = [...ballotsongame, ballot];

      // Guardar nuevo game
      await gameSchema.findByIdAndUpdate(game._id, game);

      res.status(200).json({
        code: 200,
        ballot: ballot,
      });
    } else {
      const ballotsongame = game.ballotsongame;
      const ballot = ballotsongame[ballotsongame.length - 1];
      res.status(200).json({
        code: 200,
        ballot: ballot,
      });
    }
  } catch (error) {
    console.log("Error al recuperar y enviar balota", error);
  }
});

module.exports = router;
