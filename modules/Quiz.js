const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
  Name: { type: String },

  Category: { type: String },

  Subject: { type: String },

  Overview: { type: String },

  image: { type: String },

  // creationDate: { stype: Date, default: new Date() },

  Questions: [
    {
      Title: { type: String },
      answers: [{ type: String }],
      rightIndex: Number,
    },
  ],
 /* createdBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],*/
  createdBy: { type: String }
});
const Quiz = mongoose.model("quiz", quizSchema);
module.exports = Quiz;
