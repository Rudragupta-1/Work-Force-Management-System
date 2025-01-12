 const Attendance=require('../models/attendanceModel');

 // Mark attendance for user (admin/manager)
 exports.markAttendance=async(req,res)=>{
    try{
        const{userId,status}=req.body;
        const attendance=new Attendance({user:userId.status});
        await attendance.save();
        res.status(201).json({message:"Attendance marked"});
    }
    catch(error){
        res.status(500).json({message:'Server Error'});
    }
 }
 // Get all attendance records
 exports.getUserAttendance=async(req,res)=>{
    try{
        const attendance=await Attendance.find({user:req.params.userId});
        res.json(attendance);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
 }
