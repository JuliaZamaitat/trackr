import { Request, Response } from "express";
import { Error } from "mongoose";
const FileVersions = require("../model/fileVersions"),
    File = require("../model/file");

module.exports = {
    find: (req: Request, res: Response) => {  
        let fileVersionsId = req.params.fileVersionsId;
        FileVersions.findById(fileVersionsId)
          .then((fileVersions: any) => {
            res.status(200).json(fileVersions);
          })
          .catch((error: Error) => {
            res.status(500).send(`Error fetching file versions by ID: ${error.message}`);
          });
      },

      findAll: (req: Request, res: Response) => {
        FileVersions.find().then((allFileVersions: any) => {
          if (!allFileVersions){
            res.status(404).send("No file versions found")
        }
          res.status(200).json(allFileVersions);
        }).catch((error: Error) => {
            res.status(500).send(`Error fetching file versions: ${error.message}`);
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
        })
    },

    delete: (req: Request, res: Response) => {
        let fileVersionsId = req.params.fileVersionsId;
        console.log(`File versions deleted: ${fileVersionsId}`);
        File.findByIdAndDelete(fileVersionsId)
        .then((file: File) => {
          res.json(`File versions deleted: ${fileVersionsId}`)
        })
        .catch((error: Error) => {
          console.log(`Error deleting file versions by ID: ${error.message}`)
          return;
        })
    },

    update: (req: Request, res: Response) => {
        let fileVersionId = req.params.fileId;
        FileVersions.findByIdAndUpdate(fileVersionId,
          {
            $set: {
              content: req.body.content
            },
          },
          { new: true }
        )
        .then((fileVersion: any) => {
          res.status(200).json(fileVersion)
        })
        .catch((error: Error) => {
          res.status(500).send(`Could not update file versions: ${error.message}`);
        })
      }
};