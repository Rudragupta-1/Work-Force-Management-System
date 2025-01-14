 const User=require('../models/userModel');

 // Creating Employee
 const createEmployee=async(req,res)=>{
    try{
        const {name, email,password,role}=req.body;
        const employee=await User.create({name,email,password,role});
        res.status(201).json(employee);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
 }
 // Get all employees (admin only)
 const getEmployees=async(req,res)=>{
    try{
        const employees=await User.find({role:'employee'});
        res.status(200).json(employees);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
 }

//  // Get single user by Id
//  exports.getUserById=async(req,res)=>{
//     try{
//         const user=await User.findById(req.params.id);
//         if(!user){
//             res.status(404).json({message:"User not found"});
//         }
//         res.json(user);
//     }
//     catch(error){
//         res.status(500).json({message:"Server error"});
//     }
//  }

 // Update User

 const updateEmployee=async(req,res)=>{
    try{
        const updatedEmployee=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedEmployee){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(updatedEmployee);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
 }
 // Delete employee (admin only)

 const deleteEmployee=async(req,res)=>{
    try{
        const deletedEmployee=await User.findByIdAndDelete(req.params.id);
        if(!deletedEmployee){
            res.status(404).json({message:"Employee not found"});
        }
        res.status(200).json({message:"Employee deleted successfully!"});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
 }

 module.exports={createEmployee,getEmployees,updateEmployee,deleteEmployee};