const Attendance = require('../models/attendanceModel');

// Mark attendance manually (Admin/Manager)
const markManualAttendance = async (req, res) => {
    try {
        const { user, date, status } = req.body;
        
        if (!user || !date || !status) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const attendance = await Attendance.create({ user, date, status });
        res.status(201).json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Mark attendance using face recognition (Admin/Manager)
const markFaceAttendance = async (req, res) => {
    try {
        const { user, date, faceVerified } = req.body;

        if (!user || !date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const attendance = await Attendance.create({ user, date, status: 'present', faceVerified });
        res.status(201).json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get attendance records of an employee
const getAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;  // Extract from URL params

        if (!employeeId) {
            return res.status(400).json({ message: 'Employee ID is required' });
        }

        const records = await Attendance.find({ user: employeeId });
        res.status(200).json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { markManualAttendance, markFaceAttendance, getAttendance };
