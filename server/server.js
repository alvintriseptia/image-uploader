const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoDb = require("./config/db");

const uploadRouter = require("./routes/index");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8000;

mongoose.Promise = global.Promise;
mongoose
	.connect(mongoDb.database, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(
		() => {
			console.log("MongoDB Connected");
		},
		(err) => {
			console.log(err);
		}
	);

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get("/images/:name", (req, res, next) => {
	res.sendFile(__dirname + "/images/" + req.params.name);
});

app.use("/upload", uploadRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

app.use((err, req, res, next) => {
	if (!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode).send(err.message);
});
