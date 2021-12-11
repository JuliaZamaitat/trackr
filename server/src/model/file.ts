const mongoose = require("mongoose"),
  { Schema } = mongoose,
  fileSchema = Schema({
    title: String,
    fileVersions: [
      {
        fileVersion: {
          type: Schema.Types.Object,
          ref: "FileVersion",
        },
      },
    ],
  });

module.exports = mongoose.model("File", fileSchema);

export {} //typescript fix for variables
