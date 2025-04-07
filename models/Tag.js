'use strict';
import { Model } from 'sequelize';

const Tag = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      // Add polymorphic associations manually if needed
      // For example:
      // Tag.belongsTo(models.Task, {
      //   foreignKey: 'tagForId',
      //   constraints: false,
      //   as: 'taggedTask'
      // });
    }
  }

  Tag.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tagForType: {
        type: DataTypes.STRING, // e.g., 'Task', 'Team', 'Sprint', 'Project'
        allowNull: false,
      },
      tagForId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      organisationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Organisations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Tag',
      paranoid: true,
    }
  );

  return Tag;
};

export default Tag;
