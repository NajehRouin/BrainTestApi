const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  lastName: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  IsAdmin: { type: Boolean, Default: false },

  date: { type: String },
  Quizs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quiz",
    },
  ],
});
const User = mongoose.model("user", userSchema);
module.exports = User;
