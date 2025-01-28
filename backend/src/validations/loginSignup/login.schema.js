const yup = require('yup');
module.exports = {
    body: yup.object().shape({
        emailAddress: yup
            .string()
            .email('Invalid email address')
            .required('Email address is required')
            .min(6, 'Email address must be at least 6 characters long')
            .max(255, 'Email address can be at most 255 characters long'),
        password: yup
            .string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .max(16, 'Password must be at most 16 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(
                /[@$!%*?&#]/,
                'Password must contain at least one special character'
            ),
    }),
};
