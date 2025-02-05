const {
	tokenNewService,
	tokenService,
	iamPrincipalService,
	userService,
} = require('../../services');
const jwt = require('jsonwebtoken');
const ApiError = require('../../utils/handlers/ApiError.handler');
const ApiResponse = require('../../utils/handlers/ApiResponse.handler');
const { AsyncHandler } = require('../../utils/handlers/Async.handler');
const config = require('../../config/config');
const httpStatus = require('http-status');
const { tokenTypes } = require('../../config/tokens');

function decodeToken(token) {
	return new Promise((resolve, reject) => {
		try {
			const payload = jwt.verify(token, config.jwt.secret);
			resolve(payload);
		} catch (error) {
			return reject(
				new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate', error)
			);
		}
	});
}

module.exports = {
	create: AsyncHandler(async (req, res) => {
		const token = req.body.refreshToken || req.cookies?.refreshToken;

		if (!token) {
			throw new ApiError(400, 'Token not found');
		}

		const decoded = await decodeToken(token);

		if (decoded.type !== tokenTypes.REFRESH) {
			throw new ApiError(400, 'Invalid Token');
		}

		const user = await tokenNewService.get(token);

		if (!user || user.token !== token) {
			throw new ApiError(400, 'Invalid Token');
		}

		const result = await userService.getById(user.userId);
		const tokens = await tokenService.reGenerateAccessTokens(result);

		res.cookie('accessToken', tokens.access.token, {
			httpOnly: true,
			secure: true,
			sameSite: 'None',
		});

		res
			.status(200)
			.json(new ApiResponse(200, tokens, 'Token generated successfully'));
	}),
};
