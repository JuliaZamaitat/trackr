const mongoose = require("mongoose"),
  { Schema } = mongoose,
  fileVersions = Schema({
    title: String,
    files: [
      {
          type: Schema.Types.ObjectId,
          ref: "File",
      },
    ],
  });

module.exports = mongoose.model("FileVersions", fileVersions);
