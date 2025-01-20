
const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true, 
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'on-leave'],
    default: 'present',
  },
  faceVerified: {
    type: Boolean,
    default: false, // Will be true if face recognition verifies attendance
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
