 const User=require('../models/userModel');

 // Get all users (admin only)
 exports.getAllUsers=async(req,res)=>{
    try{
        const users=await User.find();
        res.json(users);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
 }
 // Get single user by Id
 exports.getUserById=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            res.status(404).json({message:"User not found"});
        }
        res.json(user);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
 }

 // Update User

 exports.updateUser=async(req,res)=>{
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedUser){
            return res.status(404).json({message:"User not found"});
        }
        res.json(updatedUser);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }

 }
 // Delete user (admin only)

 exports.deleteUser=async(req,res)=>{
    try{
        const deletedUser=await User.findByIdAndDelete(req.params.id);
        if(!deletedUser){
            res.status(404).json({message:"User not found"});
        }
        res.json({message:"User deleted"});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
 }