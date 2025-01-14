const express=require('express');
const router=express.Router();
const taskController=require('../controllers/taskController');
const {managerMiddleware}=require('../middlewares/authMiddleware');

// Manager route to assign task
router.post('/assign',managerMiddleware,taskController.assignTask);

// Employee to get their tasks

router.get('/:uderId',taskController.getUserTasks);

module.exports=router;