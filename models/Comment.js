'use strict';
import { Model } from 'sequelize';

const Comment = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.belongsTo(models.Task, { foreignKey: 'taskId' });
    }
  }

  Comment.init(
    {
      content: { type: DataTypes.TEXT, allowNull: false },
      commentForType: {type : DataTypes.STRING , allowNull : false},
      taskId: { type: DataTypes.UUID, allowNull: false ,references :{ model:Task , key:'id'}},
      userId: { type: DataTypes.UUID, allowNull: false ,references :{ model:User , key:'id'}},
    },
    {
      sequelize,
      modelName: 'Comment',
      paranoid: true,
    }
  );

  return Comment;
};

export default Comment;
