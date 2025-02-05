const express = require('express')
const { sheetContoller } = require('../../controllers')
const auth = require('../../middlewares/auth')
const userRoutes = express()

userRoutes.use(auth())
userRoutes.post('/new-sheet', sheetContoller.create)

module.exports = userRoutes