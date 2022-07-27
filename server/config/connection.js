const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
	user: process.env.DB_USER || null,
	pass: process.env.DB_PASS || null,
});

module.exports = mongoose.connection;
