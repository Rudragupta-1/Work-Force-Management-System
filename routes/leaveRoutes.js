const express = require('express');
const { applyLeave, updateLeaveStatus, getLeaves } = require('../controllers/leaveController');
const { protect, manager, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/apply', protect, applyLeave);
router.get('/', protect, getLeaves);
router.put('/:id', protect, manager, updateLeaveStatus); // Managers can approve/reject

module.exports = router;
