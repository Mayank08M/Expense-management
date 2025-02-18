const authRouter = require('express').Router();

// authRouter.use('/admin', require('./admin.routes'));
authRouter.use('/', require('./user.routes'));

module.exports = authRouter;
