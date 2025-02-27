const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Project = require("./Project");

const Task = sequelize.define("Task", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    assignedTo: { type: DataTypes.UUID },
    dueDate: { type: DataTypes.DATE },
    priority: {
        type: DataTypes.ENUM("low", "medium", "high", "critical"),
        defaultValue: "medium",
    },
    status: { 
        type: DataTypes.ENUM("To-Do", "In Progress", "Done"), 
        defaultValue: "To-Do" 
    },
    position: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    projectId: { type: DataTypes.UUID, allowNull: false }
});

Task.belongsTo(Project, { foreignKey: "projectId", as: "project" });

module.exports = Task;
