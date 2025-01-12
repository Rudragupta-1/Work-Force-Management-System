const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');
const taskRoutes=require('./routes/taskRoutes');
const attendanceRoutes=require('./routes/attendanceRoutes');

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

//Routes

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/tasks',taskRoutes);
app.use('./auth/attendance',attendanceRoutes);

// Database connection

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("Database connected successfully").catch(err=> console.log("Database connection error",err));
})

const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
})