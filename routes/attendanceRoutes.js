const express=require('express');
const {markManualAttendance,markFaceAttendance,getAttendance}=require('../controllers/attendanceController');
const {protect,manager} =require('../middlewares/authMiddleware');

const router=express.Router();


// Admin/Manager route to mark attendance

router.post('/manual',protect,manager,markManualAttendance);
router.post('/face',protect,manager,markFaceAttendance);
router.get('/:employeeId',protect,getAttendance);

module.exports=router;
