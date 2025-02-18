const express = require('express')
const { sheetContoller, expenseController, incomeController } = require('../../controllers')
const auth = require('../../middlewares/auth')
const userRoutes = express()

userRoutes.use(auth())
userRoutes.post('/new-sheet', sheetContoller.create)
userRoutes.get('/getAll', sheetContoller.getAllSheets)
userRoutes.patch('/:_id/updateEntry', sheetContoller.updateEntry),
userRoutes.delete('/delete/:_id', sheetContoller.deleteEntry),

//expense
userRoutes.get('/getAll-expense-sheets', expenseController.getAllSheets)
userRoutes.get('/getById-expense/:_id', expenseController.getById)
userRoutes.patch('/create-entry/:_id', expenseController.createEntry)

//income
userRoutes.get('/getAll-income-sheets', incomeController.getAllSheets)
userRoutes.get('/getById-income/:_id', incomeController.getById)
userRoutes.patch('/create-income-sheet-entry/:_id', incomeController.createEntry)

module.exports = userRoutes