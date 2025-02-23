module.exports = {
    //auth
    userAuthController: require('./auth/userAuth.controller'),
    //sheet
    sheetContoller: require('./sheet/sheet.controller'),
    //expense
    expenseController: require('./expense/expense.controller'),
    //income
    incomeController: require('./income/income.controller'),
    //dashboard
    dashboardController: require('./dashboard/dashboard.controller'),
    //directExpense
    directExpenseController: require('./expense/directExpense.controller'),
    //directIncome
    directIncomeController: require('./income/directIncome.controller')

}