'use strict';
import {Model} from 'sequelize';
const TeamMembers = (sequelize, DataTypes) => {
  class TeamMembers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        
      // associations for users and Team 
      models.User.belongsToMany(models.Team, { through: TeamMembers });
      models.Team.belongsToMany(models.User, { through: TeamMembers });
    }
  }
  TeamMembers.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'TeamMembers',
    indexes: [
      {
        unique: true,
        fields: ['TeamId', 'UserId', 'deletedAt']
      }
    ]
  });
  return TeamMembers;
};

export default TeamMembers;