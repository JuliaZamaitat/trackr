import { Request, Response } from "express";
import { Error } from "mongoose";
const FileVersion = require("../model/fileVersion"),
    File = require("../model/file");

module.exports = {
    find: (req: Request, res: Response) => {  
        let fileVersionId = req.params.versionId;
        FileVersion.findById(fileVersionId)
          .then((fileVersion: any) => {
            res.status(200).json(fileVersion);
          })
          .catch((error: Error) => {
            res.status(500).send(`Error fetching file version by ID: ${error.message}`);
          });
      },

    findAll: (req: Request, res: Response) => {
        let fileId = req.params.fileId;
        File.findById(fileId)
        .then((file: any) => {
            const allFileVersions = file.fileVersions;
            if (!allFileVersions){
                res.status(404).send("No file versions found")
            }
            res.status(200).json(allFileVersions);
        })
        .catch((error: Error) => {
            res.status(500).send(`Error fetching file versions: ${error.message}`);
        });
    },

    create: (req: Request, res: Response) => {
        let fileId = req.params.fileId;
        let fileVersionParams = {
            createdAt: Date.now(),
            content: req.body.content
        }
        FileVersion.create(fileVersionParams)
        .then((fileVersion: any) => {
            File.findByIdAndUpdate(fileId,
                { $push: { fileVersions: fileVersion } },
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
        let fileVersionId = req.params.versionId;
        FileVersion.findByIdAndDelete(fileVersionId)
        .then((fileVersion: any) => {
            let fileId = req.params.fileId;
            File.findByIdAndUpdate(fileId,
                { $pull: { fileVersions: { _id: fileVersionId } } }
            )
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