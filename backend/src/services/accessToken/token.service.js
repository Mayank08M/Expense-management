const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const moment = require('moment');
const tokenModel = require('../../models/tokenModel');
const generateToken = (
	userId,
	expires,
	type,
	secret = config.jwt.secret
) => {
	const payload = {
		userId,
		iat: moment().unix(),
		exp: moment(expires).unix(),
		type,
	};
	return jwt.sign(payload, secret);
};

const saveToken = async (
	token,
	userId,
	expires,
	type,
	isblacklisted = false
) => {
	return await tokenModel.create({
		token,
		userId,
		expires: moment(expires).toDate(),
		type,
		isblacklisted,
	});
};
module.exports = {
	verifyToken: (token) => {
		return jwt.verify(token, config.jwt.secret);
	},
	generateAuthTokens: async (user) => {
		const { _id } = user;
		const accessTokenExpires = moment().add(
			config.jwt.accessExpirationMinutes,
			'minutes'
		);
		const accessToken = generateToken(
			_id,
			accessTokenExpires,
			'access'
		);

		const refreshTokenExpires = moment().add(
			config.jwt.refreshExpirationDays,
			'days'
		);
		const refreshToken = generateToken(
			_id,
			refreshTokenExpires,
			'refresh'
		);
		await saveToken(refreshToken, _id, refreshTokenExpires, 'refresh');

		return {
			access: {
				token: accessToken,
				expires: moment(accessTokenExpires).toDate(),
			},
			refresh: {
				token: refreshToken,
				expires: moment(refreshTokenExpires).toDate(),
			},
		};
	},
	reGenerateAccessTokens: async (user) => {
		const { id } = user;
		const accessTokenExpires = moment().add(
			config.jwt.accessExpirationMinutes,
			'minutes'
		);
		const accessToken = generateToken(
			id,
			accessTokenExpires,
			'access'
		);
		return {
			access: {
				token: accessToken,
				expires: moment(accessTokenExpires).toDate(),
			},
		};
	},
	generateToken,
};
