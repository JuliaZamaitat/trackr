const express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	cors = require("cors"),
	router = require("./routes/index"),
	history = require("connect-history-api-fallback"),
	serveStatic = require("serve-static");

app.use(express.json());
app.use(express.urlencoded());

const mongodbURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/trackr";

mongoose.connect(mongodbURI, { useNewUrlParser: true }).then(
	() => {
		console.log("Database is connected");
	},
	(err) => {
		console.log("Can not connect to the database" + err);
	}
);
// mongoose.set("useFindAndModify", false);
app.use(history({
	verbose: true
}));

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());

app.use(cors());


app.set("port", process.env.PORT || 3000);
app.use(serveStatic(__dirname + "/dist"));
app.use("/", router);


app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost:${app.get("port")}`);
});

module.exports = app;

