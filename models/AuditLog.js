import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class AuditLog extends Model {
    static associate(models) {
      AuditLog.belongsTo(models.User, { foreignKey: 'userId' });
      AuditLog.belongsTo(models.Task, { foreignKey: 'taskId' });
    }
  }

  AuditLog.init(
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        taskId: { type: DataTypes.UUID, allowNull: false },
        userId: { type: DataTypes.UUID, allowNull: false },
        action: { type: DataTypes.STRING, allowNull: false }, // Example: "Task Created", "Status Changed"
        details: { type: DataTypes.TEXT }
    },
    {
      sequelize,
      modelName: 'AuditLog',
      tableName: 'audit_logs',
      timestamps: true,
    }
  );

  return AuditLog;
};
