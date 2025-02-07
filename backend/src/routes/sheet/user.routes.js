const express = require('express')
const { sheetContoller, expenseController } = require('../../controllers')
const auth = require('../../middlewares/auth')
const userRoutes = express()

userRoutes.use(auth())
userRoutes.post('/new-sheet', sheetContoller.create)
userRoutes.get('/getAll', sheetContoller.getAllSheets)

//expense
userRoutes.get('/getAll-expense-sheets', expenseController.getAllSheets)
userRoutes.get('/getById-expense/:_id', expenseController.getById)
userRoutes.patch('/create-entry/:_id', expenseController.createEntry)

module.exports = userRoutes