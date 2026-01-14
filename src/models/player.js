const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const bingoBoardSchema = new mongoose.Schema(
  {
    B: { type: [Number], default: [] },
    I: { type: [Number], default: [] },
    N: { type: [Number], default: [] },
    G: { type: [Number], default: [] },
    O: { type: [Number], default: [] },
  },
  { _id: false }
);

const playerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // 👈 seguridad extra
    },
    bingoboard: {
      type: bingoBoardSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

// 🔐 Hash automático del password
playerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Player", playerSchema);
