require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const routes = require('./routes/index');
const logger = require("./config/logger");
const { errorConverter, errorHandler } = require("./middlewares/error");
const cors = require('cors');
const httpStatus = require('http-status');
const corsOptions = require('./config/cors');
const ApiError = require("./utils/handlers/ApiError.handler");

const app = express();
app.use(express.static("public"));
app.use(express.json());

let server;

const PORT = process.env.PORT || 8000;

// Connect to MongoDB with logging
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("✅ MongoDB Connected Successfully "))
	.catch((err) => console.error("❌ MongoDB Connection Error:", err));

mongoose.connection.on("connected", () => {
	console.log("✅ MongoDB is connected.");
});

mongoose.connection.on("error", (err) => {
	console.error("❌ MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
	console.log("⚠️ MongoDB disconnected.");
});

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/api', routes)

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.use((req, res, next) => {
	next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});


const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info('Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error) => {
	logger.error(error);
	exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});
