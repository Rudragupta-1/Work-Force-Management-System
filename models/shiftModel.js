const mongoose = require('mongoose');
const shiftSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    shiftType: {
      type: String,
      enum: ['morning', 'afternoon', 'evening'],
      required: true,
    },
  });
  
  module.exports = mongoose.model('Shift', shiftSchema);
  