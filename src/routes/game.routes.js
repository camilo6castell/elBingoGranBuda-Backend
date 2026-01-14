const express = require("express");
const controller = require("../controllers/game.controller");

const router = express.Router();

router.post("/", controller.createGame);
router.post("/join", controller.joinGame);
router.post("/start", controller.startGame);
router.post("/call-number", controller.callNumber);
router.get("/:gameId", controller.getGameState);

module.exports = router;
