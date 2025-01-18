 const express=require('express');
 const {createEmployee,getEmployees,updateEmployee,deleteEmployee}=require('../controllers/employeeController');
 const {protect,admin}=require('../middlewares/authMiddleware');
 
 const router=express.Router();

 // Routes
 
 router.route('/')
    .post(protect,admin,createEmployee)
    .get(protect,admin,getEmployees);

router.route('/:id')
    .put(protect,admin,updateEmployee)
    .delete(protect,admin,deleteEmployee);
        
 module.exports=router;