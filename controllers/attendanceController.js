 const Attendance=require('../models/attendanceModel');

 // Mark attendance for user (admin/manager)
 const markManualAttendance=async(req,res)=>{
    try{
        const{employeeId,date,status}=req.body;
        const attendance=await Attendance.create({employeeId,date,status});
        res.status(201).json(attendance);
    }
    catch(error){
        res.status(500).json({message:'Server Error'});
    }
 }
 // Get all attendance records
 const markFaceAttendance=async(req,res)=>{
    try{
        const{employeeId,date,faceData}=req.body;
        const attendance=await Attendance.create({employeeId,date,status:'Present',faceData});
        res.status(201).json(attendance);
    }
    catch(error){
        res.status(500).json({message:'Server Error'});
    }
 }

 const getAttendance=async(req,res)=>{
    try{
        const{employeeId}=req.body;
        const records=await Attendance.find({employeeId});
        res.status(201).json(records);
    }
    catch(error){
        res.status(500).json({message:'Server Error'});
    }
 }

 module.exports={markManualAttendance, markFaceAttendance, getAttendance};
