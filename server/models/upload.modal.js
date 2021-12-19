const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const uploadSchema = new Schema(
	{
		photo: {
			type: String,
			required: true,
		},
	},
	{
		collection: "img-uploader",
	}
);

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
