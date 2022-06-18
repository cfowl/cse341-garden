const router = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Landing page route
router.get('/', ensureGuest, (req,res) => {
    let html = '<h1>Garden API Login</h1>';
    html += '<p>Log in with your Google Account to see the api-docs.</p>';
    html += `<button onclick="window.location.href='/auth/google';">Log In</button>`;
    res.send(html);
})

// API docs route
router.use('/api-docs', ensureAuth, require('./swagger'));

// seeds route
router.use('/seeds', ensureAuth, require('./seeds'));

// garden-log route
router.use('/garden-log', ensureAuth, require('./garden-log'));

// auth route
router.use('/auth', require('./auth'));

module.exports = router;