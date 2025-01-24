const mongoose = require('mongoose');
const Task = require('../models/taskModel'); 
const User = require('../models/userModel');
const munkres = require('munkres-js'); // Hungarian Algorithm Library

/**
 * Convert difficulty and priority into numerical weights
 */
const getTaskWeight = (task) => {
    const difficultyWeight = { easy: 1, medium: 2, hard: 3 };
    const priorityWeight = { low: 1, medium: 2, high: 3 };

    return difficultyWeight[task.difficulty] * priorityWeight[task.priority] * task.estimatedTime;
};

/**
 * Assign tasks optimally using the Hungarian Algorithm
 */
const assignTasksOptimally = async (req, res) => {
    try {
        // Fetch pending tasks and available employees
        const tasks = await Task.find({ status: 'pending' });
        const users = await User.find({ role: 'employee' });

        if (tasks.length === 0 || users.length === 0) {
            return res.status(400).json({ message: 'No tasks or employees available for assignment' });
        }

        // Create cost matrix
        const costMatrix = tasks.map(task => {
            return users.map(user => getTaskWeight(task) * (user.workHours.length || 1));
        });

        // Run Hungarian Algorithm
        const assignments = munkres(costMatrix);

        // Assign tasks to employees
        const updatePromises = assignments.map(([taskIndex, userIndex]) => {
            const task = tasks[taskIndex];
            const user = users[userIndex];

            return Task.findByIdAndUpdate(task._id, { assignedTo: user._id, status: 'in-progress' }, { new: true });
        });

        await Promise.all(updatePromises);

        return res.status(200).json({ message: 'Tasks assigned optimally' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { assignTasksOptimally };
