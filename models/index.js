const sequelize = require("../config/database");

const User = require("./User");
const Project = require("./Project");
const Task = require("./Task");

const initModels = async () => {
    await sequelize.sync({ force: true });  // Reset tables on each restart
    console.log("Database synced");
};

module.exports = { sequelize, initModels, User, Project, Task };
