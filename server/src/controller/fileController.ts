import { Request, Response } from "express";
import { Error } from "mongoose";
const File = require("../model/file");

module.exports = {
  find: (req: Request, res: Response) => {  
    let fileId = req.params.id;
    console.log(`finding file: ${fileId}`);
    File.findById(fileId)
      .then((file: any) => {
        res.json(file);
      })
      .catch((error: Error) => {
        console.log(`Error fetching file by ID: ${error.message}`);
      });
  },

  create: (req: Request, res: Response) => {
    let fileParams = {
      title: req.body.title,
      createdAt: Date.now(),
      content: req.body.content
    }
    console.log(`creating file: ${fileParams}`);
    File.create(fileParams)
    .then((file: File) => {
      res.json(file)
    })
    .catch((error: Error) => {
      console.log(`Error creating new file: ${error.message}`)
      return;
    })
  },

  delete: (req: Request, res: Response) => {
    let fileId = req.params.id;
    console.log(`deleting file: ${fileId}`);
    File.findByIdAndDelete(fileId)
    .then((file: File) => {
      res.json(`File deleted: ${fileId}`)
    })
    .catch((error: Error) => {
      console.log(`Error deleting file by ID: ${error.message}`)
      return;
    })
  },

  update: (req: Request, res: Response) => {
    let fileId = req.params.id;
    console.log(`updating file: ${fileId}`);
    File.findByIdAndUpdate(fileId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
        },
      },
      { new: true }
    )
    .then((file: File) => {
      res.json(file)
    })
    .catch((error: Error) => {
      console.log(`Could not update file: ${error.message}`)
      return;
    })
  }
};
