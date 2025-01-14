const Leave = require('../models/leaveModel');

// Apply for leave
const applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const leave = await Leave.create({
      user: req.user._id,
      startDate,
      endDate,
      reason,
    });
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Error applying for leave', error });
  }
};

// Get all leave applications
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('user', 'name email role');
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leave applications', error });
  }
};

// Update leave status
const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Error updating leave status', error });
  }
};

module.exports = { applyLeave, getLeaves, updateLeaveStatus };
