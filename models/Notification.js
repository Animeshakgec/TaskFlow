const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Notification = sequelize.define("Notification", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = Notification;
