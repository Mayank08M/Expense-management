/**
 * Custom error class for handling API errors. Extends the native Error class.
 * @class ApiError
 * @extends Error
 *
 * @param {number} statusCode - HTTP status code associated with the error.
 * @param {string} [message="Something went wrong"] - Error message (default is a generic message).
 * @param {Array} [errors=[]] - Array containing specific error details or additional information.
 * @param {boolean} [isOperational=true] - Indicates if the error is operational or not.
 * @param {string} [stack=""] - Stack trace for the error (optional, defaults to an empty string).
 */
class ApiError extends Error {
	constructor(
		statusCode,
		message = 'Something went wrong',
		errors = [],
		isOperational = true,
		stack = ''
	) {
		// Call the constructor of the parent class (Error)
		super(message);

		// Custom properties for API error handling
		this.statusCode = statusCode; // HTTP status code associated with the error.
		this.data = null; // Additional data associated with the error (initially set to null).
		this.message = message; // Error message for the API response.
		this.success = false; // Indicates the failure nature of the API request.
		this.errors = errors; // Specific error details or additional information.
		this.isOperational = isOperational; // Indicates if the error is operational or not.

		// Set the stack trace if provided; otherwise, capture the current stack trace.
		if (stack) {
			this.stack = stack; // Provided stack trace.
		} else {
			Error.captureStackTrace(this, this.constructor); // Capture the current stack trace.
		}
	}
}

// Export the ApiError class for use in other modules.
module.exports = ApiError;
