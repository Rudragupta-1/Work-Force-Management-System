# Workforce Management System

## Project Overview
The Workforce Management System is a Node.js and Express-based backend application designed to streamline the management of employees, managers, and admins. It provides role-based access control (RBAC) and supports features like user management, task assignments, and attendance tracking.

---

## Key Features
- Role-based access control (Employee, Manager, Admin).
- RESTful API routes for managing users, tasks, and authentication.
- Secure authentication and authorization using middleware.
- Scalable database structure using MongoDB.

---

## Project Structure
```plaintext
workforce-management-system/
├── controllers/          # Business logic for routes
│   ├── authController.js # Handles user authentication
│   ├── taskController.js # Handles task-related operations
│   └── userController.js # Handles user-related operations
├── models/               # Database models
│   ├── userModel.js      # User schema with role-based attributes
│   ├── taskModel.js      # Task schema
│   └── attendanceModel.js# Attendance schema
├── routes/               # API routes
│   ├── authRoutes.js     # Authentication routes
│   ├── taskRoutes.js     # Task routes
│   └── userRoutes.js     # User management routes
├── config/               # Configuration files
│   └── db.js            # MongoDB connection setup
├── middleware/           # Middleware functions
│   └── authMiddleware.js # Authorization and role-based checks
├── utils/                # Utility functions (optional)
│   └── errorHandler.js   # Centralized error handling
├── .env                  # Environment variables (e.g., DB connection string)
├── app.js                # Main application entry point
├── package.json          # Node.js project metadata
├── README.md             # Project description
└── migrations/           # Database migrations (optional, for version control)
```

---

## Installation and Setup

### Prerequisites
- Node.js installed
- MongoDB database (local or cloud, e.g., MongoDB Atlas)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd workforce-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will run on `http://localhost:5000`.

---

## API Endpoints

### User Routes (`/api/users`)
- `GET /`: Get all users (Admin only).
- `GET /:id`: Get user by ID (accessible by Admin, Manager, or the user).
- `PUT /:id`: Update user (Admin or Manager).
- `DELETE /:id`: Delete user (Admin only).

### Task Routes (`/api/tasks`)
- Placeholder for future task-related features.

### Auth Routes (`/api/auth`)
- `POST /login`: Authenticate user and generate JWT.
- `POST /register`: Register a new user (Admin only).

---

## Role-Based Access Control
Roles are managed through the `role` field in the `userModel.js`:
- **Employee**: Can view their own data.
- **Manager**: Can view and update data of employees.
- **Admin**: Full control over all user data.

Middleware ensures that users can only access resources permitted by their role.

---

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Variables**: dotenv

---

