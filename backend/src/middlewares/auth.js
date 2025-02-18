const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
// const { roleRights } = require('../config/roles'); // Replace with your actual JWT secret configuration
const ApiError = require('../utils/handlers/ApiError.handler');
const config = require('../config/config');

const verifyCallback = async (req, resolve, reject, requiredRights) => {
	const token = req.header('x-auth-token') || req.cookies?.accessToken;
	if (!token) {
		return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
	}

	try {
		const decoded = jwt.verify(token, config.jwt.secret);
		req.user = decoded;

		// if (requiredRights.length) {
		// 	const userRights = roleRights.get(req.user.role);
		// 	const hasRequiredRights = requiredRights.every((requiredRight) =>
		// 		userRights.includes(requiredRight)
		// 	);
		// 	if (!hasRequiredRights && req.params.userId !== req.user.id) {
		// 		return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
		// 	}
		// }

		resolve();
	} catch (error) {
		return reject(
			new ApiError(400, 'Please authenticate', error)
		);
	}
};

const auth =
	(...requiredRights) =>
	async (req, res, next) => {
		return new Promise((resolve, reject) => {
			verifyCallback(req, resolve, reject, requiredRights);
		})
			.then(() => next())
			.catch((err) => next(err));
	};

module.exports = auth;
