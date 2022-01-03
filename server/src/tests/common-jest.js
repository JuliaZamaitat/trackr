process.env.NODE_ENV = "test";

const Files = require("../model/file");
const FileVersions = require("../model/fileVersions");
const fileController = require("../controller/fileController");
const fileVersionsController = require("../controller/fileVersionsController");
const request = require("supertest");

const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URL || process.env.MONGODB_URI || "mongodb://localhost:27017/trackr";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }); //in-memory db for testing
const db = mongoose.connection;

module.exports = {
    app: require("../index"),
	Files: Files,
	FileVersions: FileVersions,
    fileController: fileController,
    fileVersionsController: fileVersionsController,
	supertest: request,
	request: request,
	db: db,
};

afterAll(async () => {
//DONT WRITE ANYTHING IN HERE THAT MESSES WITH THE ENTRIES IN THE DB
	await db.close();
	//done();
});
