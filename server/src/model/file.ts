const mongoose = require("mongoose"),
  { Schema } = mongoose,
  fileSchema = Schema({
    title: String,
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    content: String, //look up how to save markdown to mongo
  });

module.exports = mongoose.model("File", fileSchema);

export {} //typescript fix for variables
