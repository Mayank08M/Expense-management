const express = require('express')
const { sheetContoller } = require('../../controllers')
const auth = require('../../middlewares/auth')
const userRoutes = express()

userRoutes.use(auth())
userRoutes.post('/new-sheet', sheetContoller.create)
userRoutes.get('/getAll', sheetContoller.getAllSheets)

module.exports = userRoutes