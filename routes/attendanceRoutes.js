const express=require('express');
const router=express.Router();
const attendanceController=require('../controllers/attendanceController');
const {managerMiddleware} =require('../middleware/authMiddleware');

// Admin/Manager route to mark attendance

router.post('/mark',managerMiddleware,attendanceController.markAttendance);

// Employee can view their attendance

router.get('/:userId',attendanceController.getUserAttendance);

module.exports=router;
