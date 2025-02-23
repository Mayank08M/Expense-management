const express = require('express');
const auth = require('../../middlewares/auth');
const { directExpenseController, directIncomeController } = require('../../controllers');
const userRoutes = express()

userRoutes.use(auth())

userRoutes.post('/create-expense', directExpenseController.create),
//income
userRoutes.post('/create-income', directIncomeController.create),
// userRoutes.get('/getAllIncome', dashboardController.getCategoryWiseIncomeData),
// userRoutes.get('/getLastFiveMonthsData', dashboardController.getLastFiveMonthData),

module.exports = userRoutes;