const router = require("express").Router(),
    fileController = require("../controller/fileController"),
    fileVersionsController = require("../controller/fileVersionsController");


// Handlers for File Versions
router.get("/fileVersions", fileVersionsController.findAll);
router.post("/fileVersions", fileVersionsController.create);
router.get("/fileVersions/:fileVersionsId", fileVersionsController.find);
router.put("/fileVersions/:fileVersionsId", fileVersionsController.update)
router.delete("/fileVersions/:fileVersionsId", fileVersionsController.delete);

// Handlers for Files
router.get("/fileVersions/:fileVersionsId/files", fileController.findAll);
router.post("/fileVersions/:fileVersionsId/files", fileController.create);
router.get("/fileVersions/:fileVersionsId/files/:fileId", fileController.find);
router.put("/fileVersions/:fileVersionsId/files/:fileId", fileController.update)
router.delete("/fileVersions/:fileVersionsId/files/:fileId", fileController.delete);

module.exports = router;
