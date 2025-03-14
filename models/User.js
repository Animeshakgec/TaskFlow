'use strict';
import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

const User = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Organisation);
      models.Organisation.hasMany(User);
      User.hasMany(models.Task);
      User.hasMany(models.Comment);
      User.hasMany(models.Notification);
      User.hasMany(models.AuditLog);
    }

    async checkPassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args:true,
            msg:'Email address already in use!',
        },
        validate:{
            isEmail:{
                args:true,
                msg:'Invalid Email address',
            }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isStrongPassword(value) {
              if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])?[a-zA-Z\d\W_]{8,}$/)) {
                throw new Error('Password must contain at least 8 characters, one uppercase, one lowercase and one number');
              }
            }
        },
      },
      role: {
        type: DataTypes.ENUM('Admin', 'Developer', 'Viewer'),
        allowNull: false,
        defaultValue: "viewer",
      },
      isSuperAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, options) => {
          // Hash password before creating user
          user.password = bcrypt.hashSync(user.password, 10);
        },
        beforeUpdate: (user, options) => {
          // Hash password before updating user
          if (user.changed('password')) {
            user.password = bcrypt.hashSync(user.password, 10);
          }
        },
      },
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    }
  );

  return User;
};

export default User;
