const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();

// Connect to Database
(async () => {
    try {
        await connectDB();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1); // Exit the process on DB failure
    }
})();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // Working Fine
app.use('/api/employees', require('./routes/employeeRoutes')); // Working Fine
app.use('/api/attendance', require('./routes/attendanceRoutes')); // Working Fine
app.use('/api/notifications', require('./routes/notificationRoutes')); // Working Fine
app.use('/api/tasks', require('./routes/taskRoutes')); 
app.use('/api/leaves', require('./routes/leaveRoutes')); 
app.use('/api/shifts', require('./routes/shiftRoutes')); 

// Global Error Handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});
