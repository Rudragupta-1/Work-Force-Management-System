const Leave = require('../models/leaveModel');

// Apply for leave
const applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    // Check for overlapping leave requests
    const isOverlapping = await Leave.isLeaveOverlapping(req.user._id, startDate, endDate);
    if (isOverlapping) {
      return res.status(400).json({ message: 'Leave dates overlap with an existing leave request.' });
    }

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

// Get leave applications (User-Specific & All)
const getLeaves = async (req, res) => {
  try {
    let leaves;
    if (req.user.role === 'admin' || req.user.role === 'manager') {
      leaves = await Leave.find().populate('user', 'name email role');
    } else {
      leaves = await Leave.find({ user: req.user._id });
    }

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leave applications', error });
  }
};

// Update leave status (Only Managers/Admins)
const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status update.' });
    }

    const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Error updating leave status', error });
  }
};

module.exports = { applyLeave, getLeaves, updateLeaveStatus };
