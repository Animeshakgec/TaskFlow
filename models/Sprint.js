'use strict';
import { Model } from 'sequelize';

const Sprint = (sequelize, DataTypes) => {
  class Sprint extends Model {
    static associate(models) {
      Sprint.belongsTo(models.Project, { foreignKey: 'projectId' , constraints:false , scope : { sprintType : 'project'}});
      models.Project.hasMany(Sprint, { foreignKey: 'projectId' , constraints:false , scope : { sprintType : 'project'}});

      Sprint.hasMany(models.Task, { foreignKey: 'sprintId' , constraints:false , scope : { sprintType : 'Task'}});

      Sprint.hasMany(models.Tag, {foreignKey: 'tagForId',
        constraints: false,
        scope: {
          tagForType: 'Sprint'
        }});
      models.Tag.belongsTo(Sprint, { foreignKey: 'tagForId', constraints: false, scope: { tagForType: 'Sprint' } });
    }
  }

  Sprint.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      sprintType: {type: DataTypes.STRING , allowNull : false},
      startDate: { type: DataTypes.DATE },
      endDate: { type: DataTypes.DATE },
      status: { type: DataTypes.ENUM('Planned', 'Active', 'Completed', 'Cancelled') },
      projectId: { type: DataTypes.UUID, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Sprint',
      paranoid: true,
    }
  );

  return Sprint;
};

export default Sprint;
