const express = require('express');

const router = express.Router();

const defaultRoutes = [
	{
		path: '/auth',
		route: require('./auth'),
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
