import { Request, Response } from "express";
import { Error } from "mongoose";
const FileVersion = require("../model/fileVersion");

module.exports = {
    find: (req: Request, res: Response) => {  
        let fileVersionId = req.params.fileId;
        FileVersion.findById(fileVersionId)
          .then((fileVersion: any) => {
            res.status(200).json(fileVersion);
          })
          .catch((error: Error) => {
            res.status(500).send(`Error fetching file version by ID: ${error.message}`);
          });
      },

    findAll: (req: Request, res: Response) => {
        FileVersion.find().then((allFileVersions: any) => {
          if (!allFileVersions){
              res.status(404).send("No file versions found")
          }
          res.status(200).json(allFileVersions);
        }).catch((error: Error) => {
            res.status(500).send(`Error fetching files: ${error.message}`);
        });
    },

    create: (req: Request, res: Response) => {
        let fileParams = {
          createdAt: Date.now(),
          content: req.body.content
        }
        FileVersion.create(fileParams)
        .then((fileVersion: any) => {
            res.status(201).json(fileVersion)
        })
        .catch((error: Error) => {
            res.status(500).send(`Error creating file version: ${error.message}`);
        })
    },

    delete: (req: Request, res: Response) => {
        let fileVersionId = req.params.fileId;
        FileVersion.findByIdAndDelete(fileVersionId)
        .then((fileVersion: any) => {
          res.status(200).send(`File version deleted: ${fileVersionId}`)
        })
        .catch((error: Error) => {
          res.status(500).send(`Error deleting file version by ID: ${error.message}`);
        })
    },

    update: (req: Request, res: Response) => {
        let fileVersionId = req.params.fileId;
        FileVersion.findByIdAndUpdate(fileVersionId,
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
          res.status(500).send(`Could not update file: ${error.message}`);
        })
      }

};