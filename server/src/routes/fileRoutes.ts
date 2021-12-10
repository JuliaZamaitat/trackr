
const fileController = require("../controller/fileController"),
  router = require("express").Router();


router.get("/:id", fileController.find);
router.post("/", fileController.create);
router.put("/:id", fileController.update)
router.delete("/:id", fileController.delete);

module.exports = router;
