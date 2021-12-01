import { Request, Response } from "express";

const router = require("express").Router(),
fileRoutes = require("./fileRoutes");

router.use("/files", function (req: Request, res: Response) {
	res.send("GET request to the server");
});
// router.use("/files", fileRoutes);

// router.use("/", fileRoutes);

//fileversions benutzen





module.exports = router;
