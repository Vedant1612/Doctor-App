const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');

// Routes for visit operations
router.post('/schedule', visitController.scheduleVisit); 
router.get('/user/:userId', visitController.getUserVisits); 

module.exports = router;
