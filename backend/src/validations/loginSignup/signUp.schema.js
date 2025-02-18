const yup = require('yup');

module.exports = {
    body: yup.object().shape({
        fullName: yup
            .string()
            .required('Full name is required')
            .min(2, 'Full name must be at least 2 characters long')
            .max(35, 'Full name must be at most 100 characters long'),
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
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
        mobileNumber: yup
            .string()
            .required('Mobile number is required')
            .matches(/^[0-9]+$/, 'Mobile number must be digits only')
            .min(8, 'Mobile number must be at least 8 digits')
            .max(10, 'Mobile number must be at most 10 digits'),
    })
}