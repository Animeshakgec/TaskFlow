// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Project = require("./Project");

// const Task = sequelize.define("Task", {
//     id: { 
//         type: DataTypes.UUID, 
//         defaultValue: DataTypes.UUIDV4, 
//         primaryKey: true 
//     },
//     title: { 
//         type: DataTypes.STRING,
//         allowNull: false 
//       },
//       description: {
//         type: DataTypes.TEXT 
//     },
//     assignedTo: { 
//         type: DataTypes.UUID 
//     },
//     dueDate: { 
//         type: DataTypes.DATE 
//     },
//     priority: {
//         type: DataTypes.ENUM("low", "medium", "high", "critical"),
//         defaultValue: "medium",
//       },
//       status: {
//         type: DataTypes.ENUM("To-Do", "In Progress", "Done"), 
//         defaultValue: "To-Do" 
//     },
    // position: { 
    //     type: DataTypes.INTEGER, 
    //     allowNull: false, defaultValue: 0 
    // },
//     projectId: { 
//         type: DataTypes.UUID, 
//         allowNull: false 
//         }
// });

// Task.belongsTo(Project, { foreignKey: "projectId", as: "project" });

// module.exports = Task;


'use strict';
import { Model } from 'sequelize';

const Task = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Project, { foreignKey: 'projectId',constraints: false, });
      // Task.belongsTo(models.Team, { foreignKey: 'teamId', allowNull: true ,constraints: false,});
      Task.belongsTo(models.User, { foreignKey: 'assignedTo', allowNull: true ,constraints: false,});

      Task.belongsToMany(models.Tag, {foreignKey: 'tagForId',
        constraints: false,
        scope: {
          tagForType: 'Task'
        }});

      Task.belongsTo(models.Sprint, { foreignKey: 'sprintId', allowNull: true ,constraints: false,});

      Task.hasMany(models.Comment , { foreignKey : 'commentForType' , constraints : false , scope : {
        commentForType : 'Task'
      }})
    }
  }

  Task.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      status: { type: DataTypes.ENUM('Backlog', 'To Do', 'In Progress', 'Review', 'Done') },
      priority: { type: DataTypes.ENUM('Low', 'Medium', 'High', 'Urgent') },
      projectId: { type: DataTypes.UUID, allowNull: false },
      position: { 
        type: DataTypes.INTEGER, 
        allowNull: false, defaultValue: 0 },
      assignedType:{type :DataTypes.STRING , allowNull : false },
      assignedTo: { type: DataTypes.UUID, allowNull: false },
      sprintId: { type: DataTypes.UUID, allowNull: true, references:{model: Sprint , key:'id'}},
    },
    {
      sequelize,
      modelName: 'Task',
      paranoid: true,
    }
  );

  return Task;
};

export default Task;
