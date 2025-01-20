const Notification = require('../models/notificationModel');

// Send Notification
const sendNotification = async (req, res) => {
    try {
        const { userId, message, type } = req.body;
        
        console.log("Request Body:", req.body);  // ✅ Log request data

        if (!userId || !message) {
            return res.status(400).json({ message: 'userId and message are required' });
        }

        const notification = await Notification.create({ user: userId, message, type });

        res.status(201).json(notification);
    } catch (error) {
        console.error("Error:", error);  // ✅ Log the actual error
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


// Get Notifications for a User
const getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;  // Extract from params instead of body

        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { sendNotification, getNotifications };
