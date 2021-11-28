import { Request, Response } from "express";

const router = require("express").Router();

// router.use("/users", userRoutes);
router.use("/", function (req: Request, res: Response) {
	res.send("GET request to the server");
});


module.exports = router;
