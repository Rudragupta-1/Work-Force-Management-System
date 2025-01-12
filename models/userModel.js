 const mongoose=require('mongoose');

 const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{
        type String,
        enum:['employee','manager','admin'],
        default:'employee',
    },
    tasks:[{type:mongoose.Schema.Types.ObjectId,ref:"Task"}],
    attendance:[{type:mongoose.Schema.Types.ObjectId,ref:"Attendance"}],
 });

 const User=mongoose.model('User',userSchema);

 module.exports=User;