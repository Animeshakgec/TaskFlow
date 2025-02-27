const cron = require("node-cron");
const Task = require("../../models/Task");
const User = require("../../models/User");
const sendEmail = require("../../config/email");

// Run every day at 8 AM
cron.schedule("0 8 * * *", async () => {
    console.log("Running due date reminders...");
    const today = new Date();
    const tasks = await Task.findAll({ where: { dueDate: today, status: { [Op.ne]: "completed" } } });

    for (const task of tasks) {
        const user = await User.findByPk(task.assignedTo);
        if (user) {
            sendEmail(user.email, "Task Due Reminder", `Your task "${task.title}" is due today!`);
        }
    }
});
