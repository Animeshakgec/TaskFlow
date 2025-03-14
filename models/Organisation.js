'use strict';
import { Model } from 'sequelize';

const Organisation = (sequelize, DataTypes) => {
  class Organisation extends Model {
    static associate(models) {
      Organisation.hasMany(models.User);
      Organisation.hasMany(models.Project);
      Organisation.hasMany(models.Team);
      Organisation.hasMany(models.Task);
      Organisation.hasMany(models.Sprint);
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
