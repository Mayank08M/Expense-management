const express = require('express')
const validate = require('../../middlewares/validate')
const { authValidation } = require('../../validations')
const { userAuthController } = require('../../controllers')
const userRoutes = express()

userRoutes.post('/signup', validate(authValidation.signUp), userAuthController.signUp)
userRoutes.post('/login', validate(authValidation.login), userAuthController.login)

module.exports = userRoutes