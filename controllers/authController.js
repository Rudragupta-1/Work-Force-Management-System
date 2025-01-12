 const User=require('../models/userModel');
 const bcrypt=require('bcrypt');
 const jwt=require('jsonwebtoken');

 // Register new User

 exports.register=async(req,res)=>{
    try{
        const{name, email,password,role}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            name , email , password:hashedPassword, role
        })
        await newUser.save();
        res.status(201).json({message:"User registered successfully."});
    }
    catch(error){
        res.status(500).json({message:"Server error!"});
    }
 }

 // Login the User

 exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            res.status(400).json({message:"OOPs! User not found!"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({token});
    }
    catch(error){
        res.status(500).json({message:"Server Error!"});
    }
 }