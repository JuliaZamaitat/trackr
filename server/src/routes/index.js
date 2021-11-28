const router = require("express").Router();

// router.use("/users", userRoutes);
router.use("/", function (req, res) {
	res.send("GET request to the server");
});


module.exports = router;
