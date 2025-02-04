const morgan = require('morgan');
const logger = require('./logger');

// Custom tokens
morgan.token('message', (req, res) => res.locals.errorMessage || '');

// Formats based on environment
const successFormat = `:method :url :status - :response-time ms`;
const errorFormat = `:method :url :status - :response-time ms - message: :message`;

// Handlers
const successHandler = morgan(successFormat, {
	skip: (req, res) => res.statusCode >= 400,
	stream: { write: (msg) => logger.info(msg.trim()) },
});

const errorHandler = morgan(errorFormat, {
	skip: (req, res) => res.statusCode < 400,
	stream: { write: (msg) => logger.error(msg.trim()) },
});

module.exports = { successHandler, errorHandler };
