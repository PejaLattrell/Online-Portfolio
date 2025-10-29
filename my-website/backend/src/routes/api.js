const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');

// Define API routes
router.get('/example', controller.exampleFunction);
router.post('/example', controller.exampleFunction);

module.exports = router;