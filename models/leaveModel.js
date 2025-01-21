const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= new Date();
      },
      message: 'Start date cannot be in the past.',
    },
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= this.startDate;
      },
      message: 'End date must be after the start date.',
    },
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

// Prevent overlapping leaves
leaveSchema.statics.isLeaveOverlapping = async function (userId, startDate, endDate) {
  return await this.exists({
    user: userId,
    status: { $ne: 'rejected' },
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
    ],
  });
};

module.exports = mongoose.model('Leave', leaveSchema);
