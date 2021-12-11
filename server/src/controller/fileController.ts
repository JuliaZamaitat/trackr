import { Request, Response } from "express";
import { Error } from "mongoose";
const File = require("../model/file");

module.exports = {
  find: (req: Request, res: Response) => {  
    let fileId = req.params.fileId;
    console.log(`finding file: ${fileId}`);
    File.findById(fileId)
      .then((file: any) => {
        res.status(200).json(file);
      })
      .catch((error: Error) => {
        res.status(500).json(`Error fetching file by ID: ${error.message}`);
      });
  },

  findAll: (req: Request, res: Response) => {
    File.find().then((allFiles: any) => {
      if (!allFiles) throw new Error("No files found");
      // const sorted = allFiles.sort((a: File, b: File) => {
      //   return a.createdAt.getTime() - new Date(b.date).getTime();
      // })
      res.status(200).json(allFiles);
    }).catch((error: Error) => {

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
      res.status(201).json(file)
    })
    .catch((error: Error) => {
      console.log(`Error creating new file: ${error.message}`)
      return;
    })
  },

  delete: (req: Request, res: Response) => {
    let fileId = req.params.fileId;
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
    let fileId = req.params.fileId;
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
