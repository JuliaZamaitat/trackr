const mongoose = require("mongoose"),
  { Schema } = mongoose,
  fileVersion = Schema({
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    content: String,
  });

module.exports = mongoose.model("FileVersion", fileVersion);
