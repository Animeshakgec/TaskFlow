const { Task, Project } = require("../models");

exports.createTask = async (req, res) => {
    try {
        const { title, description, projectId } = req.body;
        const project = await Project.findByPk(projectId);
        if (!project || project.ownerId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const newTask = await Task.create({ title, description, projectId });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTasksByProject = async (req, res) => {
    try {
        //const tasks = await Task.findAll({ where: { projectId: req.params.projectId } });
        const { status, priority } = req.query;
        const whereClause = {projectId: req.params.projectId };

        if (status) whereClause.status = status;
        if (priority) whereClause.priority = priority;

        const tasks = await Task.findAll({ where: whereClause });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const { logActivity } = require("./activityLogController");

exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, position , priority} = req.body;
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (priority && !["low", "medium", "high", "critical"].includes(priority)) {
            return res.status(400).json({ message: "Invalid priority" });
        }
        if (status && !["to-do", "in-progress", "done", "blocked"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const oldStatus = task.status;
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.position = position !== undefined ? position : task.position;

        await task.save();

        if (status && oldStatus !== status) {
            await logActivity(task.id, req.user.id, "Status Changed", `Changed from ${oldStatus} to ${status}`);
        }

        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        await task.destroy();
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const sendEmail = require("../config/email");

exports.assignTask = async (req, res) => {
    try {
        const { taskId, userId } = req.body;
        const task = await Task.findByPk(taskId);
        const user = await User.findByPk(userId);

        if (!task || !user) {
            return res.status(404).json({ message: "Task or User not found" });
        }

        task.assignedTo = userId;
        await task.save();

        // Send email notification
        sendEmail(user.email, "Task Assigned", `You have been assigned a new task: ${task.title}`);

        //send notifications
        const io = req.app.get("socketio");
        const Notification = require("../models/Notification");

        const notification = await Notification.create({
            userId,
            message: `You have been assigned a new task: ${task.title}`,
        });

        // Emit real-time notification
        io.emit(`notification-${userId}`, notification);


        res.json({ message: "Task assigned and email sent" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

