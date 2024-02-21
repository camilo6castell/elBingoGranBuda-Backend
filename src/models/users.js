const { Schema, mongoose } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  bingoboard: {
    B: { type: [Number], required: true },
    I: { type: [Number], required: true },
    N: { type: [Number], required: true },
    G: { type: [Number], required: true },
    O: { type: [Number], required: true },
  },
});

module.exports = mongoose.model("userSchema", userSchema);
