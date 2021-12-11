import { Request, Response } from "express";

const router = require("express").Router(),
    fileController = require("../controller/fileController"),
    fileVersionsController = require("../controller/fileVersionsController");

// Handlers for Files
router.get("/files", fileController.findAll);
router.post("/files", fileController.create);
router.get("/files/:fileId", fileController.find);
router.put("/files/:fileId", fileController.update)
router.delete("/files/:fileId", fileController.delete);

// Handlers for File Versions
router.get("/files/:fileId/fileVersions", fileVersionsController.findAll);
router.post("/files/:fileId/fileVersions", fileVersionsController.create);
router.get("/files/:fileId/fileVersions/:versionId", fileVersionsController.find);
router.put("/files/:fileId/fileVersions/:versionId", fileVersionsController.update)
router.delete("/files/:fileId/fileVersions/:versionId", fileVersionsController.delete);

module.exports = router;
