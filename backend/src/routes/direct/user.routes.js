const express = require('express');
const auth = require('../../middlewares/auth');
const { directExpenseController, directIncomeController } = require('../../controllers');
const userRoutes = express()

userRoutes.use(auth())

userRoutes.post('/create-expense', directExpenseController.create),
userRoutes.get('/getAll-expense', directExpenseController.getAllDirectExpenses),
userRoutes.patch('/update-expense', directExpenseController.updateEntry),
userRoutes.delete('/delete-expense', directExpenseController.deleteEntry),
userRoutes.delete('/deleteAll-expense', directExpenseController.deleteAll),
//income
userRoutes.post('/create-income', directIncomeController.create),
userRoutes.get('/getAll-income', directIncomeController.getAllDirectIncomes),
userRoutes.patch('/update-income', directIncomeController.updateEntry),
userRoutes.delete('/delete-income', directIncomeController.deleteEntry),
userRoutes.delete('/deleteAll-income', directIncomeController.deleteAll),
// userRoutes.get('/getAllIncome', dashboardController.getCategoryWiseIncomeData),
// userRoutes.get('/getLastFiveMonthsData', dashboardController.getLastFiveMonthData),

module.exports = userRoutes;