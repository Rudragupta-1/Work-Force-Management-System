const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { protect, manager } = require('../middlewares/authMiddleware');
const { assignTasksOptimally } = require('../controllers/taskAssignment');

const router = express.Router();

router.post('/', protect, manager, createTask);
router.get('/', protect, getTasks);
router.put('/:id', protect, manager, updateTask);
router.delete('/:id', protect, manager, deleteTask);
router.post('/assign-tasks', assignTasksOptimally);
module.exports = router;
