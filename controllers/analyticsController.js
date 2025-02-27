const Task = require("../models/Task");
const User = require("../models/User");
const { Op } = require("sequelize");

// 1. Task Completion Rate
exports.getTaskCompletionRate = async (req, res) => {
    try {
        const totalTasks = await Task.count();
        const completedTasks = await Task.count({ where: { status: "completed" } });

        const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        res.json({ totalTasks, completedTasks, completionRate });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 2. Active Users (Users who completed tasks in the last 30 days)
exports.getActiveUsers = async (req, res) => {
    try {
        const activeUsers = await User.findAll({
            include: [
                {
                    model: Task,
                    where: {
                        status: "completed",
                        updatedAt: {
                            [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
                        },
                    },
                },
            ],
        });

        res.json({ activeUsers: activeUsers.length, users: activeUsers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 3. Overdue Tasks Report
exports.getOverdueTasks = async (req, res) => {
    try {
        const overdueTasks = await Task.findAll({
            where: {
                status: { [Op.ne]: "completed" },
                dueDate: { [Op.lt]: new Date() },
            },
        });

        res.json({ overdueTasks: overdueTasks.length, tasks: overdueTasks });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
