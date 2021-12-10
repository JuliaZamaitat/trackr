
const fileController = require("../controller/fileController"),
  router = require("express").Router();


router.get("/:id", fileController.find);
router.post("/", fileController.create);
router.delete("/:id", fileController.delete);
router.put("/:id", fileController.update)

module.exports = router;
