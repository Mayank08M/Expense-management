/**
 * Asynchronous error handler for Express routes.
 * @function AsyncHandler
 *
 * @param {Function} fn - Asynchronous function to be executed.
 * @returns {Function} Middleware function that handles errors for asynchronous routes.
 */
module.exports.AsyncHandler = (fn) => (req, res, next) => {
	// Wrap the asynchronous function in a promise and handle any errors by passing them to the next middleware.
	Promise.resolve(fn(req, res, next)).catch(next);
};
