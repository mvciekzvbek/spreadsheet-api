import AWS from 'aws-sdk';
import 'dotenv/config';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const upload = async (fileName, buffer, contentType) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${process.env.AWS_S3_DIRECTORY}/${fileName}`,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read',
  };
  return s3.upload(params).promise();
};

const S3Service = {
  upload,
};

export default S3Service;
