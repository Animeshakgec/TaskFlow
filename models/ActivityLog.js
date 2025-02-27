const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Task = require("./Task");
const User = require("./User");

const ActivityLog = sequelize.define("ActivityLog", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    taskId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false }, // Example: "Task Created", "Status Changed"
    details: { type: DataTypes.TEXT }
});

ActivityLog.belongsTo(Task, { foreignKey: "taskId", as: "task" });
ActivityLog.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = ActivityLog;
