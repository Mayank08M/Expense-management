const httpStatus = require('http-status');
const ApiError = require('../utils/handler/ApiError.handler');
const pick = require('../utils/handler/pick.handler');

const validate = (schema) => (req, res, next) => {
	const validSchema = pick(schema, [
		'params',
		'query',
		'body',
		'file',
		'files',
	]);
	const object = pick(req, Object.keys(validSchema));

	const promises = Object.keys(validSchema).map((key) =>
		validSchema[key].validate(object[key], { abortEarly: false })
	);

	Promise.all(promises)
		.then((validatedValues) => {
			validatedValues.forEach((value, index) => {
				const key = Object.keys(validSchema)[index];
				req[key] = value;
			});
			next();
		})
		.catch((err) => {
			const errorMessage = err.inner.map((detail) => detail.message).join(', ');
			next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
		});
};

module.exports = validate;
