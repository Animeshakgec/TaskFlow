const ActivityLog = require("../models/ActivityLog");

exports.logActivity = async (taskId, userId, action, details) => {
    await ActivityLog.create({ taskId, userId, action, details });
};

exports.getActivityLogsByTask = async (req, res) => {
    try {
        const logs = await ActivityLog.findAll({ where: { taskId: req.params.taskId } });
        res.json(logs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
