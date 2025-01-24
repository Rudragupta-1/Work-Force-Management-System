# Workforce Management System - Backend

## 🚀 Introduction
The **Workforce Management System** is a uniquely designed backend solution for managing employee-related operations, developed by **Rudra Gupta**, a **former Visiting Scholar at IIT Gandhinagar** and **former Research Intern at IIT Ropar**. This project is a **one-of-a-kind** backend architecture that cannot be found anywhere on Google, GitHub, or YouTube. With a structured and modular approach, it sets a new benchmark in backend development.

This system offers a **robust, secure, and scalable** infrastructure that integrates **attendance tracking, task allocation, leave management, shift scheduling, authentication, and notifications**, ensuring seamless workforce operations.

## 🔥 Open Challenge
This backend project is **exclusively designed** by **one of the top backend developers, Rudra Gupta**. You won't find this **architecture, logic, or implementation anywhere else**.

If you believe otherwise, feel free to challenge it! Fork it, analyze it, and try to find a similar project online! 🚀

---

## ⚡ Features
This backend system is **feature-packed** and built for real-world applications:

1. **Authentication & Authorization** - Secure user authentication with JWT.
2. **Attendance Management** - Real-time tracking of employee attendance.
3. **Employee Management** - CRUD operations for employee details.
4. **Leave Management** - Handling leave requests and approvals.
5. **Task Allocation** - Assign and manage employee tasks efficiently.
6. **Shift Scheduling** - Organize and optimize workforce scheduling.
7. **Notifications System** - Automated notifications and alerts.
8. **Robust Role-Based Access Control (RBAC)** - Ensures appropriate user permissions.
9. **Highly Scalable and Modular Architecture** - Built with industry best practices.
10. **Error Handling & Logging** - Centralized error management with detailed logs.

---

## 📁 Repository Structure
The project follows a clean and modular folder structure, ensuring maintainability and scalability:

```
Work-Force-Management-System
│── client/                    # Frontend (if applicable)
│── config/                    # Database configuration
│   └── db.js
│── controllers/               # Controllers for business logic
│   ├── attendanceController.js
│   ├── authController.js
│   ├── employeeController.js
│   ├── leaveController.js
│   ├── notificationController.js
│   ├── shiftController.js
│   ├── taskController.js
│── middlewares/               # Authentication & error handling
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│── models/                    # Database models (Schemas)
│   ├── attendanceModel.js
│   ├── deploy.prototxt
│   ├── leaveModel.js
│   ├── notificationModel.js
│   ├── res10_300x300_ssd_iter_140000.caffemodel
│   ├── shiftModel.js
│   ├── taskModel.js
│   ├── userModel.js
│── routes/                    # API Routes
│   ├── attendanceRoutes.js
│   ├── authRoutes.js
│   ├── employeeRoutes.js
│   ├── leaveRoutes.js
│   ├── notificationRoutes.js
│   ├── shiftRoutes.js
│   ├── taskRoutes.js
│── myenv/                     # Virtual environment
│── node_modules/              # Node.js dependencies
│── .env                       # Environment variables
│── .gitignore                 # Git ignore file
│── app.js                     # Entry point
│── face.py                    # Face recognition logic
│── package.json               # Dependencies
│── package-lock.json          # Dependency lock file
│── README.md                  # Project documentation
```

---

## 📌 API Endpoints & Controllers
Each API follows **RESTful principles** and maintains a **robust, secure, and modular structure**.

### **Authentication APIs** (`authRoutes.js` → `authController.js`)
- `POST /api/auth/register` → Register new users.
- `POST /api/auth/login` → Authenticate users & return JWT.
- `GET /api/auth/profile` → Fetch user profile (protected route).

### **Employee APIs** (`employeeRoutes.js` → `employeeController.js`)
- `GET /api/employees` → Fetch all employees.
- `POST /api/employees` → Add a new employee.
- `PUT /api/employees/:id` → Update employee details.
- `DELETE /api/employees/:id` → Remove an employee.

### **Attendance APIs** (`attendanceRoutes.js` → `attendanceController.js`)
- `POST /api/attendance` → Mark attendance.
- `GET /api/attendance/:id` → Fetch employee attendance.

### **Leave APIs** (`leaveRoutes.js` → `leaveController.js`)
- `POST /api/leaves` → Apply for leave.
- `GET /api/leaves/:id` → Get leave details.
- `PUT /api/leaves/:id/approve` → Approve leave.

### **Task Management APIs** (`taskRoutes.js` → `taskController.js`)
- `POST /api/tasks` → Assign tasks.
- `GET /api/tasks/:id` → Fetch tasks.
- `PUT /api/tasks/:id` → Update task.

### **Shift Scheduling APIs** (`shiftRoutes.js` → `shiftController.js`)
- `POST /api/shifts` → Create shift.
- `GET /api/shifts/:id` → Get shift details.

### **Notifications APIs** (`notificationRoutes.js` → `notificationController.js`)
- `POST /api/notifications` → Send notifications.
- `GET /api/notifications/:id` → Retrieve notifications.

---

## 🛠️ **Project Robustness & Reliability**

### **1️⃣ Status Codes Used & Their Meaning**
- **200 OK** → Request successful.
- **201 Created** → Resource successfully created.
- **400 Bad Request** → Invalid input.
- **401 Unauthorized** → Authentication failed.
- **403 Forbidden** → Access denied.
- **404 Not Found** → Resource does not exist.
- **500 Internal Server Error** → Unexpected server issue.

### **2️⃣ Robustness of Routes**
- Implemented **JWT authentication** to prevent unauthorized access.
- Used **rate limiting** to protect against brute-force attacks.
- Applied **input validation** to prevent SQL injections and XSS attacks.

### **3️⃣ Schema Validation**
- Used **Mongoose schemas** with strict type validation.
- Ensured **referential integrity** across models.
- Implemented **default values and required fields** to maintain data consistency.

### **4️⃣ Modularity & Scalability**
- **Separation of concerns** - Routes, Controllers, Models, and Middlewares are independent.
- **Centralized error handling** for consistent error responses.
- **Easily extendable** with additional features.

---

# 📌 Face Recognition Integration with MongoDB

## Overview
This project integrates **face recognition** into an **attendance system** using **MongoDB** for data storage. It employs **computer vision** techniques to detect, register, and verify faces, ensuring a robust and secure authentication mechanism.

## 🚀 Technologies Used
- **OpenCV** – For capturing and processing facial images
- **Deep Learning Model** – SSD-based face detection (`Caffe Model`)
- **MongoDB** – Database for storing user and attendance data
- **Cosine Similarity** – For comparing face embeddings
- **NumPy** – For numerical computations
- **Scikit-Learn** – For similarity calculations
- **Python** – Backend logic implementation

---

## 🔗 How Face Recognition Works
### 1️⃣ **Face Registration**
When a user registers, their facial features are:
- Captured via webcam
- Processed (grayscale conversion, resizing, and histogram equalization)
- Converted into a **numerical vector**
- Stored in MongoDB under the `faceData` field for future verification

#### 📌 **Database Structure (`users` Collection)**
```json
{
  "_id": ObjectId("..."),
  "email": "user@example.com",
  "faceData": [0.123, 0.456, ...]  // Flattened face vector
}
```

### 2️⃣ **Face Verification & Attendance Marking**
When an employee attempts to verify their identity:
- A new facial image is captured
- It is preprocessed and converted into a **feature vector**
- The stored face vector is retrieved from MongoDB
- **Cosine Similarity** compares the two vectors
- If similarity exceeds `0.75`, the user is verified
- Attendance is updated (or created if not present)

#### 📌 **Attendance Update (`attendances` Collection)**
```json
{
  "_id": ObjectId("..."),
  "user": ObjectId("..."),
  "date": "2025-01-24",
  "status": "present",
  "faceVerified": true
}
```

### ✅ **Handling Edge Cases**
- **If no face is detected:** Prompts the user to retry.
- **If the face is unrecognized:** No attendance is marked.
- **If attendance exists:** Updates existing record instead of creating a duplicate.

---

## 🔧 Robustness & Testing
This system has been tested on **multiple individuals**, ensuring **high accuracy and minimal false positives**. The **face detection threshold (0.75 cosine similarity)** is optimized for real-world usage, providing a balance between security and usability.

---

## 🛠 How to Run
```bash
python face.py
```
1️⃣ **Register a new user**: Enter their email and capture their face.
2️⃣ **Verify attendance**: Face recognition will confirm identity and update the database.

This integration ensures a **seamless and automated** attendance tracking system using **AI-powered face recognition!** 🚀

Here’s a **professional README section** for the **Hungarian Algorithm** in your project:  

---

## **🔹 Automated Task Assignment Using Hungarian Algorithm**  

### **📌 What is the Hungarian Algorithm?**  
The **Hungarian Algorithm** is an **optimization technique** used for **solving assignment problems** in a **cost-effective manner**. It is particularly useful when there are multiple tasks and multiple employees, and we need to assign each task to an employee **optimally** based on a given set of criteria.  

In this **Workforce Management System**, the algorithm **automates** task allocation, eliminating **manual selection** and ensuring a **mathematically optimized** distribution of work.

---

### **🚀 Why Use Hungarian Algorithm for Task Assignment?**  
✔ **Eliminates manual task allocation** – No need for managers to manually assign tasks.  
✔ **Optimal workload distribution** – Ensures fair work distribution among employees.  
✔ **Based on multiple factors** – Assigns tasks based on attributes like **difficulty, priority, estimated time, and dependencies** (from Task Schema).  
✔ **Fast & Scalable** – Works in a **single API call** and handles large datasets efficiently.  

---

### **⚙ How Does the Algorithm Work in Our Project?**  
1️⃣ **Matrix Representation**:  
   - Each **task** and **employee** are represented in a **cost matrix**.  
   - The values in the matrix are computed based on task **difficulty, priority, estimated time, and employee workload**.  

2️⃣ **Cost Calculation**:  
   - The algorithm minimizes the "cost" of assigning tasks by considering:  
     ✅ **Task Difficulty** (hard tasks to experienced employees)  
     ✅ **Task Priority** (high-priority tasks are assigned first)  
     ✅ **Estimated Time** (distributes tasks based on work hours)  
     ✅ **Employee Availability** (ensures employees don’t get overloaded)  

3️⃣ **Assignment Process**:  
   - The algorithm finds an **optimal pairing** where each task is assigned to the most suitable employee.  

4️⃣ **Single API Execution**:  
   - **All tasks** are assigned **in one go** using an API call.  
   - The `assignedTo` field in **MongoDB** is updated, and **task statuses** change from `"pending"` to `"in-progress"`.  

---

### **🔍 Example Workflow**  
- Assume **5 employees** and **10 tasks**.  
- The Hungarian Algorithm evaluates **all possible assignments** and finds the most optimal way to assign each task.  
- Instead of random or manual allocation, the system **automatically assigns tasks** based on employee skill, availability, and workload.  
- After execution, **MongoDB gets updated**, and tasks transition to `"in-progress"` with assigned employees.  

---

### **📌 Key Benefits**  
✔ **Automated decision-making** – No human intervention required.  
✔ **Optimized workforce utilization** – Balances workload effectively.  
✔ **Ensures fairness** – Employees get tasks best suited for them.  
✔ **Improves efficiency** – Tasks get assigned optimally in real-time.  

---

This **algorithm-driven automation** enhances the **scalability and efficiency** of the Workforce Management System. 🚀

## 📢 Conclusion
This **Workforce Management System Backend** is a **highly scalable, secure, and well-structured** project designed by **Rudra Gupta**. It stands out due to its **unique approach to workforce operations**, ensuring smooth task handling, attendance tracking, leave management, and seamless communication. This project is **not available anywhere online**, making it an **exclusive benchmark in backend engineering**.

If you're a developer, you're welcome to **explore, challenge, and contribute!** 🔥

---

### 📌 **Contact**
For queries, contributions, or collaborations, feel free to connect with **Rudra Gupta**.

🚀 Happy Coding!

