'use strict';
import { Model } from 'sequelize';

const Project = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {

      Project.belongsTo(models.Team, { foreignKey: 'TeamId' });
      models.Team.hasMany(Project, { foreignKey: 'TeamId' });

      Project.hasMany(models.Task, { foreignKey: 'projectId' });

      Project.hasMany(models.Tag, {foreignKey: 'tagForId',
        constraints: false,
        scope: {
          tagForType: 'Project'
        }});
      models.Tag.belongsTo(Project, { foreignKey: 'tagForId', constraints: false, scope: { tagForType: 'Project' } });
    }
  }

  Project.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT ,allowNull : true},
      teamId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      organizationId: { type: DataTypes.UUID, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Project',
      paranoid: true,
    }
  );

  return Project;
};

// export default Project;
// 'use strict';
// import { Model } from 'sequelize';

// const Project = (sequelize, DataTypes) => {
//   class Project extends Model {
//     static associate(models) {
//       Project.belongsTo(models.Organisation);
//       Project.hasMany(models.Task);
//     }
//   }

//   Project.init(
//     {
//       name: { type: DataTypes.STRING, allowNull: false },
//       description: { type: DataTypes.TEXT },
//     },
//     { sequelize, modelName: 'Project' }
//   );

//   return Project;
// };

export default Project;
