'use strict';
import { Model } from 'sequelize';
import s3 from '../config/aws.js';
import { v4 as uuidv4 } from 'uuid';

const FileAttachment = (sequelize, DataTypes) => {
  class FileAttachment extends Model {
    static associate(models) {
      FileAttachment.belongsTo(models.Task, { foreignKey: 'taskId' });
      FileAttachment.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  FileAttachment.init(
    {
      fileName: { type: DataTypes.STRING, allowNull: false },
      fileUrl: { type: DataTypes.STRING, allowNull: false },
      attachmentForType: { type: DataTypes.STRING, allowNull: false },
      taskId: { type: DataTypes.UUID, allowNull: false },
      userId: { type: DataTypes.UUID, allowNull: false },
      size: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'FileAttachment',
      paranoid: true,
      hooks: {
        async beforeCreate(file) {
          if (file.fileData) {
            const fileKey = `${uuidv4()}-${file.fileName}`;
            const params = {
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: fileKey,
              Body: file.fileData,
              ContentType: file.fileType,
            };

            const uploadResult = await s3.upload(params).promise();

            file.fileUrl = uploadResult.Location; // Store file URL in DB
          }
        },
      },
    }
  );

  return FileAttachment;
};

export default FileAttachment;
