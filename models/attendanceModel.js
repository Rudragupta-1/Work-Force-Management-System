 const mongoose=require('mongoose');

 const attendanceSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    date:{type:Date,default:Date.now},
    status:{type:String, enum:['present','absent','late'],default:'present'},
 })

 const Attendance=mongoose.model('Attendance',attendanceSchema);
 module.exports=Attendance;