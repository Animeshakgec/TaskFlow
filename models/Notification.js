'use strict';
import { Model } from 'sequelize';

const Notification = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Notification.init(
    {
      type: {
        type: DataTypes.ENUM('TaskAssigned', 'TaskCompleted', 'CommentAdded'),
        allowNull: false,
      },
      message: { type: DataTypes.STRING, allowNull: false },
      UserId : {type : DataTypes.UUID , allowNull : false , references : { model : User , key: 'id'}},
      isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'Notification',
      paranoid: true,
    }
  );

  return Notification;
};

export default Notification;
