const express=require('express');

const {applyLeave,updateLeaveStatus,getLeaves}=require('../controllers/leaveController');
const{protect,manager,admin}=require('../middlewares/authMiddleware');

const router=express.Router();

router.post('/apply',protect,applyLeave);
router.get('/',protect,manager,getLeaves);
router.put('/:id',protect,admin,updateLeaveStatus);

module.exports=router;