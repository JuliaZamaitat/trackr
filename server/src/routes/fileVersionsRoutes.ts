const fileVersionsController = require("../controller/fileVersionsController");
//const router = require("express").Router();

router.get("/", fileVersionsController.findAll);
router.post("/", fileVersionsController.create);
router.get("/:id", fileVersionsController.find);
router.put("/:id", fileVersionsController.update)
router.delete("/:id", fileVersionsController.delete);

module.exports = router;