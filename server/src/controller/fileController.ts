import { Request, Response } from "express";
import { Error } from "mongoose";
const File = require("../model/file");

module.exports = {
  find: (req: Request, res: Response) => {  console.log("here");
  console.log(req);
    let fileId = req.params.id;
    File.findById(fileId)
      .then((file: any) => {
        res.json(file);
      })
      .catch((error: Error) => {
        console.log(`Error fetching file by ID: ${error.message}`);
      });
  },
};

//TODO: Post
// Todo: Put/patch (updaten)
//Todo: Delete