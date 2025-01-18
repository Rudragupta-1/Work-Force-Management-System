const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Ensures email is stored in lowercase
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['employee', 'manager', 'admin'],
    default: 'employee',
  },
  faceData: {
    type: String, // Store encoded facial data for recognition
  },
  points: {
    type: Number,
    default: 0,
  },
  workHours: [
    {
      date: { type: Date, required: true },
      hours: { type: Number, required: true, min: 0 }, // Prevents negative hours
    },
  ],
  shift: {
    type: String,
    enum: ['morning', 'afternoon', 'evening'],
    default: 'morning',
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('User', userSchema);
