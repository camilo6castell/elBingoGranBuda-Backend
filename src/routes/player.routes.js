const express = require("express");
const controller = require("../controllers/player.controller");

const router = express.Router();

router.post("/", controller.login);
router.post("/registry", controller.register);
router.post("/bingoboard", controller.saveBingoBoard);
router.post("/isongame", controller.isOnGame);
router.post("/deleteboard", controller.deleteBoard);

module.exports = router;