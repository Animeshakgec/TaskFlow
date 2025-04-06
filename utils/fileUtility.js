import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const client = new S3Client({ region : process.env.AWS_DEFAULT_REGION });

export const uploadFileToS3 = async (body, bucket, key, isPublic = false) => {
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ACL: isPublic ? 'public-read' : undefined
    });

    try {
        const response = await client.send(command);
        return response;
    } catch (err) {
        logger.error(err);
        return null;
    }
}