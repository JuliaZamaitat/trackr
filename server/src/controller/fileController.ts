import { Request, Response } from "express";
import { Error } from "mongoose";
const File = require("../model/file"),
  FileVersions = require("../model/fileVersions");

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

  findAll: (req: Request, res: Response) => {
    let fileVersionsId = req.params.fileVersionsId;
    FileVersions.findById(fileVersionsId)
    .then((fileVersions: any) => {
        const allFiles = fileVersions.files;
        if (!allFiles){
            res.status(404).send("No files found")
        }
        res.status(200).json(allFiles);
    })
    .catch((error: Error) => {
        res.status(500).send(`Error fetching files: ${error.message}`);
    });
  },

  create: (req: Request, res: Response) => {
    let fileVersionsId = req.params.fileVersionsId;
    let fileParams = {
        title: req.body.title,
        createdAt: Date.now(),
        content: req.body.content
    }
    File.create(fileParams)
    .then((file: any) => {
        FileVersions.findByIdAndUpdate(fileVersionsId,
            { $set: { files: file } },
            { new: true }
        )
        .then((file: any) => {
            console.log(file)
            res.status(201).json(file)
        })
        .catch((error: Error) => {
            res.status(500).send(`Could not find parent file: ${error.message}`);
        })
    })
    .catch((error: Error) => {
        res.status(500).send(`Error creating file version: ${error.message}`);
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
