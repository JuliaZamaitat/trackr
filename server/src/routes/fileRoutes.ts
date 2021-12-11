
const fileController = require("../controller/fileController");
const router = require("express").Router();
//const fileVersionsRoutes = require("./fileVersionsRoutes")  

router.get("/", fileController.findAll);
router.post("/", fileController.create);
router.get("/:id", fileController.find);
router.put("/:id", fileController.update)
router.delete("/:id", fileController.delete);

//router.use("/:id/fileVersions", fileVersionsRoutes);

module.exports = router;
