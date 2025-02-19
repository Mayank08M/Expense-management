const express = require('express');
const { dashboardController } = require('../../controllers');
const auth = require('../../middlewares/auth')
const userRoutes = express()

userRoutes.use(auth())

userRoutes.get('/getAllExpense', dashboardController.getCategoryWiseExpenseData)

module.exports = userRoutes;