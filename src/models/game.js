const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: { type: String },
    host: { type: String, required: true }, // email del host

    players: {
      type: [String], // emails
      default: [],
    },

    status: {
      type: String,
      enum: ["waiting", "started", "finished"],
      default: "waiting",
    },

    numbersCalled: {
      type: [Number],
      default: [],
    },

    winner: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
