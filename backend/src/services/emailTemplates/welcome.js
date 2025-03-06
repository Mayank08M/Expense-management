const { brevoApi } = require('../../api');
const config = require('../../config/config');
const logger = require('../../config/logger');
const footer = require('../../utils/constant/footer');
const header = require('../../utils/constant/header');
const ApiError = require('../../utils/handlers/ApiError.handler');

module.exports = {
	welcomeEmail: async (to, name) => {
		try {
			const emailOptions = {
				from: 'Budget Buddy ' + config.email.from,
				to: to,
				subject: 'Welcome to Budget Buddy!',
				html: `<body style="font-family: 'Open Sans', sans-serif; font-size: 14px; margin: 15px 0; padding: 0; width: 100% !important;"></body>
    <div style="margin: 0; padding: 0; width: 100%; background-color: #f9f6f3;">
        <div style="position: relative; overflow: hidden; background-color: white; max-width: 900px; width: 95%; margin: auto;">
        ${header}
            <div style="padding: 40px 50px 0px 50px; text-align: left;">
                <p style="color: #202020; font-weight: 400; line-height: 20px;">Hi ${name},<br>
                <br> Welcome! We're thrilled to have you join Budget Buddy.</p>
                <p style="margin: 0; margin-bottom: 10px; color: #202020; font-weight: 400; line-height: 20px;">Here’s what you can do next:</p>
                <p style="margin: 0; margin-bottom: 5px; color: #202020; font-weight: 400; line-height: 20px;">1. <strong>Manage Your Finances:</strong> You can manage your finances directly from the webapp.</p>
                <p style="margin: 0; margin-bottom: 5px; color: #202020; font-weight: 400; line-height: 20px;">2. <strong>Make Multiple Sheets:</strong>You can make multiple expense/income sheets to note down your transactions.</p>
                <p style="margin: 0; margin-bottom: 5px; color: #202020; font-weight: 400; line-height: 20px;">3. <strong>Track your Expense/Income:</strong> You can track your expense/income directly from the webapp.</p>
                <p style="margin: 0; margin-bottom: 5px; color: #202020; font-weight: 400; line-height: 20px;">4. <strong>Monitor Your Finance:</strong> Stay up to date with the performance of your finances, directly through the webapp.</p>
                <p style="color: #202020; font-weight: 400; line-height: 20px;">Should you have any questions or need assistance, feel free to reach out to us at info@budgetbuddy.com, and our team will be more than happy to help.</p>

            </div>
            <div style="padding: 1px 0px 0px 50px; margin-top: 5px;">
                <p style="padding: 0px 0px 40px 0px; line-height: 25px; margin: 0;color: #202020">Regards,<br>Team Budget Buddy</p>
            </div>
            ${footer}
        </div>
    </div>
</body>
`,
			};
			// const result = await transporter.sendMail(emailOptions);
			const result = await brevoApi.sendBulkEmail([
				{
					to: [
						{
							email: to,
							name: name,
						},
					],
					htmlContent: emailOptions.html,
					subject: emailOptions.subject,
				},
			]);
			logger.info(`Email sent: ${to}`);
			return result;
		} catch (error) {
			logger.error('Error sending email:', error.response ? error.response.data : error.message);
			throw new ApiError('Sign Up email not send :' + error.message);
		}
	},
};
