const express = require('express');
const { scheduleShift, getShifts, updateShift } = require('../controllers/shiftController');
const { protect, manager } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/schedule', protect, manager, scheduleShift);
router.get('/', protect, getShifts);
router.put('/:id', protect, manager, updateShift);

module.exports = router;
