 const express=require('express');
 const router=express.Router();
 const userController=require('../controllers/userController');
 const {authMiddleware,adminMiddleware}=require('../middleware/authMiddleware');

 // 
 router.get('/',adminMiddleware,userController.getAllUsers);
 router.get('/:id',userController.getUserById);
 router.put('/:id',adminMiddleware,userController.updateUser);
 router,delete('/:id',adminMiddleware,userController.deleteUser);

 module.exports=router;