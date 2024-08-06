const { Schema, mongoose } = require("mongoose");

// const userSchema = new Schema({
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   bingoboard: { type: [Number], required: false },
// });

const gameSchema = new Schema({
  name: { type: String, required: false },
  ballots: { type: [Number], required: false },
  users: { type: [String], required: false },
  ballotsongame: { type: [Number], required: false },
  iswinner: { type: Boolean, required: false },
  winner: { type: String, required: false },
  ongame: { type: Boolean, default: false, required: false },
});

module.exports = mongoose.model("gameSchema", gameSchema);
