const Shift = require('../models/shiftModel');

// Schedule a shift
const scheduleShift = async (req, res) => {
  try {
    const { user, date, shiftType } = req.body;
    const shift = await Shift.create({ user, date, shiftType });
    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling shift', error });
  }
};

// Get all shifts
const getShifts = async (req, res) => {
  try {
    const shifts = await Shift.find().populate('user', 'name email role');
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shifts', error });
  }
};

// Update a shift
const updateShift = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!shift) return res.status(404).json({ message: 'Shift not found' });
    res.status(200).json(shift);
  } catch (error) {
    res.status(500).json({ message: 'Error updating shift', error });
  }
};

module.exports = { scheduleShift, getShifts, updateShift };
