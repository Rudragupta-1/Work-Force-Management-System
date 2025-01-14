const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const errorMiddleware=require('./middlewares/errorMiddleware');
dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.use(express.json());

//Routes

app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/employees',require('./routes/employeeRoutes'));
app.use('/api/attendance',require('./routes/attendanceRoutes'));
app.use('api/notifications',require('./routes/notificationRoutes'));
app.use('api/tasks',require('./routes/taskRoutes'));
app.use('/api/leaves',require('./routes/leaveRoutes'))
app.use('/api/shifts',require('./routes/shiftRoutes'))

app.use(errorMiddleware);

const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
})