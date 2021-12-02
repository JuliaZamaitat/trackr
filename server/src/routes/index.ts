import { Request, Response } from "express";

const router = require("express").Router(),
fileRoutes = require("./fileRoutes");

router.use("/files", fileRoutes);


//fileversions benutzen

module.exports = router;
