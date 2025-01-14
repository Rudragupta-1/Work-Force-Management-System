# Workforce Management System

A comprehensive backend system for managing workforce operations including employee management, task scheduling, attendance tracking, and leave management.

## Features

- **Employee Management**: Complete CRUD operations for managing employee information
- **Role-based Access Control**: Secure authorization system with different access levels
- **Task Management**: 
  - Hungarian algorithm implementation for optimal task assignment
  - Task priority management
  - Task dependency tracking
- **Attendance System**: Face recognition-based attendance tracking
- **Smart Notifications**: Automated alerts and updates for various events
- **Shift Scheduling**: Comprehensive shift management system
- **Work Hours Logging**: Track and manage employee work hours
- **Leave Management**: Handle employee leave requests and approvals

## Project Structure

```
project/
├── app.js                      # Application entry point
├── routes/                     # API routes
│   ├── employeeRoutes.js      # Employee management routes
│   ├── taskRoutes.js          # Task management routes
│   ├── attendanceRoutes.js    # Attendance system routes
│   ├── leaveRoutes.js         # Leave management routes
│   ├── shiftRoutes.js         # Shift scheduling routes
│   └── notificationRoutes.js  # Notification system routes
├── controllers/               # Request handlers
│   ├── employeeController.js
│   ├── taskController.js
│   ├── attendanceController.js
│   ├── leaveController.js
│   ├── shiftController.js
│   └── notificationController.js
├── models/                    # Database schemas
│   ├── userModel.js
│   ├── taskModel.js
│   ├── attendanceModel.js
│   ├── leaveModel.js
│   ├── shiftModel.js
│   └── notificationModel.js
├── middlewares/              # Middleware functions
│   ├── authMiddleware.js     # Authentication middleware
│   └── errorMiddleware.js    # Error handling middleware
└── utils/                    # Utility functions
    ├── hungarianAlgorithm.js # Task optimization algorithm
    └── notificationUtils.js  # Notification helper functions
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Face-api.js for facial recognition
- Hungarian Algorithm for task optimization

## Setup

1. **Prerequisites**
   - Node.js
   - MongoDB
   - npm or yarn

2. **Installation**
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/workforce-management.git

   # Install dependencies
   npm install

   # Set up environment variables
   cp .env.example .env
   ```

3. **Running the Application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Employee Management
- `POST /api/employees` - Create new employee
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get single employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Task Management
- `POST /api/tasks` - Create new task
- `GET /api/tasks` - Get all tasks
- `PUT /api/tasks/:id` - Update task
- `POST /api/tasks/assign` - Assign tasks using Hungarian algorithm

### Attendance
- `POST /api/attendance` - Record attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/recognize` - Face recognition attendance

### Leave Management
- `POST /api/leave` - Submit leave request
- `GET /api/leave` - Get leave records
- `PUT /api/leave/:id` - Update leave status

## Testing

```bash
# Run tests
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
