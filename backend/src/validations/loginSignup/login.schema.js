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
    }),
};
