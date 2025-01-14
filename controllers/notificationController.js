const Notification=require('../models/notificationModel');

// Send notification

const sendNotification=async(req,res)=>{
    try{
        const {userId,message,type}=req.body;
        const notification=await Notification.create({userId,message,type});
        res.status(201).json(notification);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
}

const getNotification=async(req,res)=>{
    try{
        const {userId}=req.body;
        const notifications=await Notification.find({userId});
        res.status(200).json(notifications);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
}

module.exports={sendNotification,getNotification};