'use strict';
import Tenant from './base/tenant.js';
const Tag = (sequelize, DataTypes) => {
  class Tag extends Tenant {
    static associate(models) {
      // define association here
    }
  }
  Tag.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tagForType: {
      type: DataTypes.STRING,// like [Task,Team,Sprint,project...]
      allowNull: false,
    },
    tagForId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    OrganisationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Organisations',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Tag',
  });
  return Tag;
};

export default Tag;