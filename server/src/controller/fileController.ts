import { Request, Response } from "express";
import { Error } from "mongoose";
const File = require("../model/file");

module.exports = {
  find: (req: Request, res: Response) => {  
    let fileId = req.params.fileId;
    File.findById(fileId)
      .then((file: any) => {
        res.status(200).json(file);
      })
      .catch((error: Error) => {
        res.status(500).send(`Error fetching file by ID: ${error.message}`);
      });
  },

  findAll: (req: Request, res: Response) => {
    File.find().then((allFiles: any) => {
      if (!allFiles){
        res.status(404).send("No files found")
    }
      res.status(200).json(allFiles);
    }).catch((error: Error) => {
        res.status(500).send(`Error fetching files: ${error.message}`);
    });
  },

  create: (req: Request, res: Response) => {
    let fileParams = {
      title: req.body.title,
      createdAt: Date.now(),
    }
    File.create(fileParams)
    .then((file: any) => {
      res.status(201).json(file)
    })
    .catch((error: Error) => {
      res.status(500).send(`Error creating new file: ${error.message}`);
    })
  },

  delete: (req: Request, res: Response) => {
    let fileId = req.params.fileId;
    File.findByIdAndDelete(fileId)
    .then((file: any) => {
      res.status(200).json(`File deleted: ${fileId}`)
    })
    .catch((error: Error) => {
      res.status(500).send(`Error deleting file by ID: ${error.message}`);
    })
  },

  update: (req: Request, res: Response) => {
    let fileId = req.params.fileId;
    File.findByIdAndUpdate(fileId,
      {
        $set: {
          title: req.body.title
        },
      },
      { new: true }
    )
    .then((file: any) => {
      res.status(200).json(file)
    })
    .catch((error: Error) => {
      res.status(500).send(`Could not update file: ${error.message}`);
    })
  }
};
