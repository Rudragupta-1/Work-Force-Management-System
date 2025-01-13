const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   title: {
     type: String,
     required: true,
   },
   description: {
     type: String,
   },
   assignedTo: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
   },
   difficulty: {
     type: String,
     enum: ['easy', 'medium', 'hard'],
   },
   priority: {
     type: String,
     enum: ['low', 'medium', 'high'],
   },
   dependencies: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Task',
   }],
   status: {
     type: String,
     enum: ['pending', 'in-progress', 'completed'],
     default: 'pending',
   },
 });
 
 module.exports = mongoose.model('Task', taskSchema);
 