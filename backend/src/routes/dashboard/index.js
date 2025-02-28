const dashboardRouter = require('express').Router();

// authRouter.use('/admin', require('./admin.routes'));
dashboardRouter.use('/', require('./user.routes'));

module.exports = dashboardRouter;