const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

// Creating Employee
const createEmployee = async (req, res) => {
    try {
        const { name, email, password, role, faceData, points, workHours, shift } = req.body;

        // Validate required fields
        if (!name || !email || !password || !shift || !Array.isArray(workHours)) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ensure valid role
        const validRoles = ['employee', 'manager', 'admin'];
        const assignedRole = validRoles.includes(role) ? role : 'employee';

        // Create employee with all required fields
        const employee = await User.create({
            name,
            email,
            password: hashedPassword,
            role: assignedRole,
            faceData: faceData || [], // Default empty array if not provided
            points: points || 0, // Default to 0
            workHours: workHours || [], // Default to empty array
            shift
        });

        res.status(201).json({ message: "Employee created successfully", employee });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Get all employees (admin only)
const getEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' }).select('-password'); // Exclude password
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get single employee by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update Employee
const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        if (!updatedEmployee) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Employee (admin only)
const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await User.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createEmployee, getEmployees, getUserById, updateEmployee, deleteEmployee };
