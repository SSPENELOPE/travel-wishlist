const router = require('express').Router();

const pageRoutes = require('./pages/home.js');
const apiRoutes = require('./api/destinations.js');

router.use('', pageRoutes);
router.use('api', apiRoutes);

module.exports = router;