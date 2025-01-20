const express = require('express');
const { sendNotification, getNotifications } = require('../controllers/notificationController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/', protect, admin, sendNotification); 
router.get('/:userId', protect, getNotifications);

module.exports = router;
