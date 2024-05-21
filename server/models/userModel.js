const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    numOfActions: Number,
  },
  { versionKey: false }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
