const express = require("express");
const router = express.Router();

router.use("/players", require("./player.routes"));
router.use("/games", require("./game.routes"));

module.exports = router;
