const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    date: String,
    startingHour: Number,
    endingHour: Number,
  },
  { versionKey: false }
);

const Shift = mongoose.model("shift", shiftSchema);

module.exports = Shift;
