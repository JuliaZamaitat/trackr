import { Request, Response } from "express";

const router = require("express").Router(),
fileRoutes = require("./fileRoutes"),
fileVersionsRoutes = require("./fileVersionsRoutes");

router.use("/files", fileRoutes);
router.use("/files/:id/fileVersions", fileVersionsRoutes);


//fileversions benutzen

module.exports = router;
