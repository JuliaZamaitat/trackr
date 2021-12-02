
const fileController = require("../controller/fileController"),
  router = require("express").Router();


router.get("/:id", fileController.find);
//routen für alle weiteren methoden hinzufügen

module.exports = router;
