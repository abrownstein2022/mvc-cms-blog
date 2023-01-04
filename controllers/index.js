const router = require('express').Router();

const apiRoutes = require('./api');
//viewRoutes means handlebar views
const viewRoutes = require('./viewRoutes');

router.use('/', viewRoutes);
router.use('/api', apiRoutes);

module.exports = router;
