const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Project = sequelize.define("Project", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    ownerId: { type: DataTypes.UUID, allowNull: false }
});

// Define relationship: A project belongs to a user (owner)
Project.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

module.exports = Project;
