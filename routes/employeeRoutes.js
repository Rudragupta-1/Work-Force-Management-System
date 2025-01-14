 const express=require('express');
 const {createEmployee,getEmployees,updateEmployee,deletEmployee}=require('../controllers/employeeController');
 const {protect,admin}=require('../middleware/authMiddleware');
 
 const router=express.Router();

 // Routes
 
 router.route('/')
    .post(protect,admin,createEmployee)
    .get(protect,admin,getEmployees);

    router.route('/:id')
        .put(protect,admin,updateEmployee)
        .delete(protect,admin,deletEmployee);
        
 module.exports=router;