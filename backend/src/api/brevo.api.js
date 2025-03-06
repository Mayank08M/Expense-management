const { default: axios } = require('axios');
const config = require('../config/config');

const instance = axios.create({
	baseURL: config.email.BrevobaseURL,
	headers: {
		'api-key': config.email.api_key, // Replace with your actual API key,
		'Content-Type': 'application/json',
	},
});

async function sendBulkEmail(messageVersions) {
	return await instance.post('/smtp/email', {
		sender: {
			name: 'Budget Buddy',
			email: config.email.from,
		},
		htmlContent: '-',
		subject: '-',
		messageVersions: messageVersions,
	});
}

module.exports = { sendBulkEmail };
