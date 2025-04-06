'use strict';
import { Model } from 'sequelize';

const Organisation = (sequelize, DataTypes) => {
  class Organisation extends Model {
    static associate(models) {
      Organisation.hasMany(models.User , {foreignKey : 'organisationId'});
      models.User.belongsTo(Organisation , {foreignKey : 'organisationId'});

      Organisation.hasMany(models.Project   , {foreignKey : 'organisationId'});
      models.Project.belongsTo(Organisation , {foreignKey : 'organisationId'});

      Organisation.hasMany(models.Team , {foreignKey : 'organisationId'});
      models.Team.belongsTo(Organisation , {foreignKey : 'organisationId'});

      Organisation.hasMany(models.Task, {foreignKey : 'organisationId'});
      models.Task.belongsTo(Organisation , {foreignKey : 'organisationId'});
      
      Organisation.hasMany(models.Sprint , {foreignKey : 'organisationId'});
      models.Sprint.belongsTo(Organisation , {foreignKey : 'organisationId'});
    }
  }

  Organisation.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    { sequelize, modelName: 'Organisation' }
  );

  return Organisation;
};

export default Organisation;
