const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

//  "/" routes not prefixed with "api" are standard UI routes
//! host/
router.use('/', homeRoutes);
// all routes prefixed with "/api" only reference data routes
//! host/api
router.use('/api', apiRoutes);

module.exports = router;
