// const sequelize = require("../config/database");

// const User = require("./User");
// const Project = require("./Project");
// const Task = require("./Task");

// const initModels = async () => {
//     await sequelize.sync({ force: true });  // Reset tables on each restart
//     console.log("Database synced");
// };

// module.exports = { sequelize, initModels, User, Project, Task };
// import { Sequelize } from 'sequelize';
// import config from './config/database.js';

// import Organisation from './models/Organisation.js';
// import User from './models/User.js';
// import Project from './models/Project.js';
// import Team from './models/Team.js';
// import Task from './models/Task.js';
// import Priority from './models/Priority.js';
// import Comment from './models/Comment.js';
// import FileAttachment from './models/FileAttachment.js';
// import TaskDependency from './models/TaskDependency.js';
// import Notification from './models/Notification.js';
// import AuditLog from './models/AuditLog.js';
// import Sprint from './models/Sprint.js';

// const env = process.env.NODE_ENV || 'development';
// const sequelize = new Sequelize(config[env]);

// const db = {};

// // Initialize models
// db.Organisation = Organisation(sequelize, Sequelize.DataTypes);
// db.User = User(sequelize, Sequelize.DataTypes);
// db.Project = Project(sequelize, Sequelize.DataTypes);
// db.Team = Team(sequelize, Sequelize.DataTypes);
// db.Task = Task(sequelize, Sequelize.DataTypes);
// db.Priority = Priority(sequelize, Sequelize.DataTypes);
// db.Comment = Comment(sequelize, Sequelize.DataTypes);
// db.FileAttachment = FileAttachment(sequelize, Sequelize.DataTypes);
// db.TaskDependency = TaskDependency(sequelize, Sequelize.DataTypes);
// db.Notification = Notification(sequelize, Sequelize.DataTypes);
// db.AuditLog = AuditLog(sequelize, Sequelize.DataTypes);
// db.Sprint = Sprint(sequelize, Sequelize.DataTypes);

// // Define associations
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// // Sync models with database
// const syncDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ Connection established successfully.');

//     // Sync all models (use { force: true } for development reset)
//     await sequelize.sync({ alter: true });
//     console.log('✅ Database synchronized.');
//   } catch (error) {
//     console.error('❌ Unable to connect to the database:', error);
//   }
// };

// // Connect to database
// syncDB();

// // Export database instance and Sequelize
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;

import { Sequelize } from 'sequelize';
import dbConfig from '../config/database.js';

import Organisation from './Organisation.js';
import User from './User.js';
import Project from './Project.js';
import Team from './Team.js';
import Task from './Task.js';
import Comment from './Comment.js';
import FileAttachment from './FileAttachment.js';
import Notification from './Notification.js';
import AuditLog from './AuditLog.js';
import Sprint from './Sprint.js';
import Tag from './Tag.js';
import TeamMembers from './TeamMembers.js';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: false,
  }
);

const db = {};

// Initialize models
db.Organisation = Organisation(sequelize, Sequelize.DataTypes);
db.User = User(sequelize, Sequelize.DataTypes);
db.Project = Project(sequelize, Sequelize.DataTypes);
db.Team = Team(sequelize, Sequelize.DataTypes);
db.Task = Task(sequelize, Sequelize.DataTypes);
db.Comment = Comment(sequelize, Sequelize.DataTypes);
db.FileAttachment = FileAttachment(sequelize, Sequelize.DataTypes);
db.Notification = Notification(sequelize, Sequelize.DataTypes);
db.AuditLog = AuditLog(sequelize, Sequelize.DataTypes);
db.Sprint = Sprint(sequelize, Sequelize.DataTypes);
db.Tag = Tag(sequelize, Sequelize.DataTypes);
db.TeamMembers = TeamMembers(sequelize, Sequelize.DataTypes);

// Define associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sync models with database
const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection established successfully.');

    // Sync all models (use { force: true } for development reset)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

// Connect to database
syncDB();

// Export database instance and Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

