import { Request, Response } from "express";
import { Error } from "mongoose";
const File = require("../model/file");

module.exports = {
  find: (req: Request, res: Response) => {  
    console.log("finding file");
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

  create: (req: Request, res: Response) => {
    let fileParams = {
      title: req.body.title,
      createdAt: Date.now(),
      content: req.body.content
    }
    File.create(fileParams)
    .then((file: File) => {
      res.json(file)
    })
    .catch((error: Error) => {
      console.log('Could not create new file: ' + error.message)
      return;
    })
  },

  delete: (req: Request, res: Response) => {
    let fileId = req.params.id;
    File.delete(fileId)
    .then((file: File) => {
      res.json("File deleted: ${file.id}")
    })
    .catch((error: Error) => {
      console.log('Could not delete file: ${error.message}')
      return;
    })
  },

  update: (req: Request, res: Response) => {
    let fileParams = {
      fileId: req.body.id,
      fileTitle: req.body.title,
      fileContent: req.body.content
    } 
    File.update(fileParams)
    .then((file: File) => {
      res.json(file)
    })
    .catch((error: Error) => {
      console.log('Could not update file: ${error.message}')
      return;
    })
  }
};

//TODO: Post
//Beispiel:
// create: (req, res) => {
//   let studyplanParams = {
//     program: req.body.program,
//   };
//   StudyPlan.create(studyplanParams)
//     .then((studyPlan) => {
//       res.json(studyPlan);
//     })
//     .catch((error) => {
//       console.log(`Error saving studyplan: ${error.message}`);
//       return;
//     });
// },
// Todo: Put/patch (updaten)
//Todo: Delete