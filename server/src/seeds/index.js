const File = require("../model/file.ts"),
	FileVersions = require("../model/fileVersions.ts"),
	mongoose = require("mongoose");

//connect mongoose
const mongo = process.env.MONGODB_URI || "mongodb://localhost:27017/trackr";
mongoose
	.connect(mongo, { useNewUrlParser: true })
	.catch((err) => {
		console.log(err.stack);
		process.exit(1);
	})
	.then(() => {
		console.log("connected to db in development environment");
	});

async function loadFiles() {
	await File.deleteMany({});
	await FileVersions.deleteMany({});

	const fileData = 
		new File({
			title: "String",
			createdAt: Date.now(),
			content: "Das ist mein schöner Inhalt", 
		});

	const fileData2 = 
		new File({
			title: "String 2",
			createdAt: Date.now(),
			content: "Das ist mein schöner Inhalt 2", 
		});

    
	const file = await File.create(fileData);
	const file2 = await File.create(fileData2);

	const fileVersionsData = new FileVersions({
		title: "Alle Files",
		files: [file, file2]
	}); 
	const fileVersions = await FileVersions.create(fileVersionsData);

	console.log("----");
	console.log("database seeded with:");
	console.log("----");
	console.log("file: " + JSON.stringify(file));
	console.log("fileVersions: " + JSON.stringify(fileVersions));

	console.log("----");
	return ".";
}

loadFiles().then(() => {
	mongoose.disconnect();
	console.log("database connection closed after seeding.");
});
