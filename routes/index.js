const router = require('express').Router();

// API docs route
router.use('/', require('./swagger'));

// contacts route
router.use('/plantsInfo', require('./plantsInfo'));

module.exports = router;