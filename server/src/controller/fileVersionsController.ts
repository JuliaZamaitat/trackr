import { Request, Response } from "express";
import { Error } from "mongoose";
const FileVersions = require("../model/fileVersions"),
  File = require("../model/file");

module.exports = {
  find: (req: Request, res: Response) => {
    let fileVersionsId = req.params.fileVersionsId;
    FileVersions.findById(fileVersionsId).populate("files")
      .then((fileVersions: any) => {
        return res.status(200).json(fileVersions);
      })
    .catch((error: Error) => {
    res.status(500).send(`Error fetching file versions by ID: ${error.message}`);
    return;
    });
  },

  findAll: (req: Request, res: Response) => {
    FileVersions.find().populate("files").then((allFileVersions: any) => {
      if (!allFileVersions) {
        res.status(404).send("No file versions found")
      }
      res.statusCode = 200;
      res.json(allFileVersions);
      }).catch((error: Error) => {

        res.status(500).send(`Error fetching file versions: ${error.message}`);
        return;
    });
  },

  create: (req: Request, res: Response) => {
    let fileVersionsParams = {
      title: req.body.title
    }
    FileVersions.create(fileVersionsParams)
      .then((fileVersions: any) => {
        res.status(201).json(fileVersions)
      })
      .catch((error: Error) => {
        res.status(500).send(`Error creating new file versions: ${error.message}`);
        return;
      })
  },

  delete: (req: Request, res: Response) => {
    let fileVersionsId = req.params.fileVersionsId;
    FileVersions.findById(fileVersionsId).populate("files").then((fileVersions: any) => {
      for (let file in fileVersions.files) {
        File.findByIdAndDelete(fileVersions.files[file].id).then((file: any) => {
          res.status(200).json(`File versions deleted: ${fileVersions.id}`)
        })
          .catch((error: Error) => {
            res.status(500).send(`Error deleting file: ${error.message}`)
            return;
          })
      }
    });
    FileVersions.findByIdAndDelete(fileVersionsId)
      .then((fileVersions: any) => {
        res.status(200).json(`File versions deleted: ${fileVersions.id}`)
      })
      .catch((error: Error) => {
        res.status(500).send(`Error deleting file versions by ID: ${error.message}`)
        return;
      })
  },

  update: (req: Request, res: Response) => {
    let fileVersionsId = req.params.fileVersionsId;
    FileVersions.findByIdAndUpdate(fileVersionsId,
      {
        $set: {
          title: req.body.title,
          files: req.body.files
        },
      },
      { new: true }
    )
      .then((fileVersion: any) => {
        res.status(200).json(fileVersion)
      })
      .catch((error: Error) => {
        res.status(500).send(`Could not update file versions: ${error.message}`);
        return;
      })
  }
};
