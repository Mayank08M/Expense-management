const express = require('express');
const { dashboardController } = require('../../controllers');
const auth = require('../../middlewares/auth')
const userRoutes = express()

userRoutes.use(auth())

userRoutes.get('/getAllExpense', dashboardController.getCategoryWiseExpenseData),
userRoutes.get('/getAllIncome', dashboardController.getCategoryWiseIncomeData),
userRoutes.get('/getLastFiveMonthsData', dashboardController.getLastFiveMonthData),
userRoutes.get('/getThirtyDaysData', dashboardController.getLastThirtyDaysData),

module.exports = userRoutes;