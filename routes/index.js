const router = require('express').Router();

// API docs route
router.use('/', require('./swagger'));

// contacts route
router.use('/seeds', require('./seeds'));

module.exports = router;