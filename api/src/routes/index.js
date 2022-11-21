const express = require('express');
const metalBands = require('./metalBands.route');

const router = express.Router();

router.use('/metalBands', metalBands);

router.get('/', (req, res) => res.send('Stokelp test - API V1'));
router.get('/health', (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    res.send(JSON.stringify(healthcheck));
});

module.exports = router;