'use strict';
import { Model } from 'sequelize';

const Team = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      
        //project association   
        Team.belongsTo(models.Project, { foreignKey: 'projectId' });
        models.Project.hasMany(Team, { foreignKey: 'projectId' });

        //user
        Team.belongsToMany(models.User, { through: models.TeamMembers });
        models.User.belongsToMany(Team , { through: models.TeamMembers })

        //task
        models.Task.belongsTo(Team,{foreignKey:'taskId',constraints: false , scope:{ assignedType:'Team' }})
    }
  }

  Team.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      projectId: { type: DataTypes.UUID, allowNull: false },
      organisationId: { type:DataTypes.UUID , references : { model: Model.Organisation, key: 'id'} , allowNull:false }
    },
    {
      sequelize,
      modelName: 'Team',
      paranoid: true,
    }
  );

  return Team;
};

export default Team;
