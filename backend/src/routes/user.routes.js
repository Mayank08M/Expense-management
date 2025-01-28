const express = require('express')
const validate = require('../middlewares/validate')
const { authValidation } = require('../validations')
const { userAuthController } = require('../controllers')
const userRoutes = express()

userRoutes.post('/api/signup', validate(authValidation.signUp), userAuthController.signUp)

module.exports = userRoutes