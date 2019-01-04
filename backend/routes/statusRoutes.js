// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/status', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to User-Register crafted with love!',
        requests: count
    });
});

module.exports = router