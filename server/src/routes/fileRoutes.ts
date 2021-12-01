import { Request, Response } from "express";

const fileController = require("../controller/fileController"),
  router = require("express").Router();

  
  router.get("/", (req: Request, res: Response) => {
    res.send("Juhu")
  });

// router.get("/:id", fileController.find);
//routen für alle weiteren methoden hinzufügen

module.exports = router;
