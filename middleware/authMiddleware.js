const jwt=require('jsonwebtoken');
const user=require('../models/userModel');

// For authenticating JWT

exports.authMiddleware=async(req,res,next)=>{
    const token=req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Access denied"});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(401).json({message:'Invalid token'});
    }
};

//For admins
exports.adminMiddleware=async(req,res,next)=>{
    if(req.user.role!==admin){
        return res.status(403).json({message:'Access denied'});
    }
    next();
};

exports.managerMiddleware=async(req,res,next)=>{
    if(req.user.role!=='manager' && req.user.role!=='admin'){
        return res.status(403).json({message:'Access denied'});
    }
    next();
};