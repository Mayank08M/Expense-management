const config = require('../config/config');
const httpStatus = require('http-status');
const logger = require('../config/logger');
const multer = require('multer');
const ApiError = require('../utils/handlers/ApiError.handler');

const errorConverter = (err, req, res, next) => {
    let error = err;

    if (error instanceof multer.MulterError) {
        error = new ApiError(
            httpStatus.BAD_REQUEST,
            error.message,
            error,
            true,
            err.stack
        );
    } 
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, error, false, err.stack);
    }

    next(error);
};


const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    // Ensure the status code is valid
    if (!statusCode || isNaN(statusCode) || statusCode < 100 || statusCode > 599) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR; // Default to 500
    }

    if (config.env === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        success: false,
        message,
        ...(config.env === 'development' && { stack: err.stack }),
    };

    if (config.env === 'development') {
        logger.error(err);
    }

    res.status(statusCode).json(response); // Use `json` instead of `send` to ensure correct content type
};



module.exports = {
    errorConverter,
    errorHandler,
};
