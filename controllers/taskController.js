const Task = require('../models/taskModel');
const mongoose = require('mongoose');

const createTask = async (req, res) => {
  try {
    const { title, description, priority, difficulty, dependencies, assignedTo, estimatedTime, status } = req.body;

    // Validate required fields
    if (!title || !estimatedTime) {
      return res.status(400).json({ message: 'Title and estimatedTime are required' });
    }

    // Ensure valid priority
    const validPriorities = ['low', 'medium', 'high'];
    const taskPriority = validPriorities.includes(priority) ? priority : 'medium';

    // Ensure valid difficulty
    const validDifficulties = ['easy', 'medium', 'hard'];
    const taskDifficulty = validDifficulties.includes(difficulty) ? difficulty : 'medium';

    // Create the task with all necessary fields
    const task = await Task.create({
      title,
      description,
      priority: taskPriority,
      difficulty: taskDifficulty,
      dependencies: dependencies || [],
      assignedTo: assignedTo || null,
      estimatedTime,
      status: status || 'pending' // Default status
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo').populate('dependencies');
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
