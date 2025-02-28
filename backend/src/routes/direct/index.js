const directRoutes = require('express').Router();

// authRouter.use('/admin', require('./admin.routes'));
directRoutes.use('/', require('./user.routes'));

module.exports = directRoutes;