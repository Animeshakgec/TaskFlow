const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Task = require("./Task");
const User = require("./User");

const Comment = sequelize.define("Comment", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    taskId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false }
});

Comment.belongsTo(Task, { foreignKey: "taskId", as: "task" });
Comment.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = Comment;
