const router = require('express').Router();

// API docs route
router.use('/', require('./swagger'));

// seeds route
router.use('/seeds', require('./seeds'));

// garden-log route
router.use('/garden-log', require('./garden-log'));

module.exports = router;