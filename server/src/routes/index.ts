import { Request, Response } from "express";

const router = require("express").Router(),
    fileController = require("../controller/fileController"),
    fileVersionController = require("../controller/fileVersionController");

// Handlers for Files
router.get("/files", fileController.findAll);
router.post("/files", fileController.create);
router.get("/files/:fileId", fileController.find);
router.put("/files/:fileId", fileController.update)
router.delete("/files/:fileId", fileController.delete);

// Handlers for File Versions
router.get("/files/:fileId/fileVersions", fileVersionController.findAll);
router.post("/files/:fileId/fileVersions", fileVersionController.create);
router.get("/files/:fileId/fileVersions/:versionId", fileVersionController.find);
router.put("/files/:fileId/fileVersions/:versionId", fileVersionController.update)
router.delete("/files/:fileId/fileVersions/:versionId", fileVersionController.delete);

module.exports = router;
