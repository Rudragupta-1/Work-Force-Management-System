 const Task=require('../models/taskModel');

 //Assign task to the user
exports.assignTask=async(req,res)=>{
    try{
        const{userId,title,description,deadline}=req.body;
        const newTask=new Task({
            title,
            description,
            assignedTo:userId,
            deadline
        })
        await newTask.save();
        res.status(201).json({message:"Task assigned successfully"})l
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
}

 // Get tasks for a user
exports.getUserTasks=async(req,res)=>{
    try{
        const tasks=await Task.find({assignedTo:req.params.userId});
        res.json(tasks);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
}
