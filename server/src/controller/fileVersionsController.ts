import { Request, Response } from "express";
import { Error } from "mongoose";
const FileVersions = require("../model/fileVersions");

module.exports = {
    find: (req: Request, res: Response) => {
        res.status(200).json("File found");
    },

    findAll: (req: Request, res: Response) => {
        res.status(200).json("All Files found");
    },

    create: (req: Request, res: Response) => {
        res.status(200).json("File created");
    },

    delete: (req: Request, res: Response) => {
        res.status(200).json("Files deleted");
    },

    update: (req: Request, res: Response) => {
        res.status(200).json("Files updated");
    }

};