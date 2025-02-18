const dotenv = require('dotenv');
const path = require('path');
const yup = require('yup');
const crypto = require('crypto');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = yup
    .object()
    .shape({
        NODE_ENV: yup
            .string()
            .oneOf(['production', 'development', 'test'])
            .required(),
        PORT: yup.number().default(3000),
        JWT_SECRET: yup.string().required('JWT secret key is required'),
        JWT_ACCESS_EXPIRATION_MINUTES: yup
            .number()
            .default(30)
            .required('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: yup
            .number()
            .default(30)
            .required('days after which refresh tokens expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: yup
            .number()
            .default(10)
            .required('minutes after which reset password token expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: yup
            .number()
            .default(10)
            .required('minutes after which verify email token expires'),

        OTP_EXPIRE_IN_MIN: yup.number().nullable(),
        CODE_SECRET: yup.string().required('Code secret key is required'),

    })
    .noUnknown();

try {
    const envVars = envVarsSchema.validateSync(process.env, {
        abortEarly: false,
        stripUnknown: true,
    });

    module.exports = {
        env: envVars?.NODE_ENV,
        port: envVars?.PORT,
        // apiVersion: envVars.API_VERSION,
        seeder_enable: envVars?.SEEDER,
        byPassOTP: envVars?.BY_PASS_OTP,
        byPassNotification: envVars?.BY_PASS_NOTIFICATION,
        byPassEmail: envVars?.BY_PASS_EMAIL,
        jwt: {
            secret: envVars?.JWT_SECRET,
            accessExpirationMinutes: envVars?.JWT_ACCESS_EXPIRATION_MINUTES,
            refreshExpirationDays: envVars?.JWT_REFRESH_EXPIRATION_DAYS,
            resetPasswordExpirationMinutes:
                envVars?.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
            verifyEmailExpirationMinutes:
                envVars?.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
        },
        expiryTime: {
            otp_in_Min: envVars.OTP_EXPIRE_IN_MIN || 2,
        },
        code: {
            secret: crypto.createHash('sha256').update(envVars.CODE_SECRET).digest(),
            blacklist: new Set(),
        },
    };
} catch (error) {
    throw new Error(
        `Config validation error: ${Array.isArray(error?.errors) ? error.errors?.join(', ') : error}`
    );
}
