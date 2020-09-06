import AWS from 'aws-sdk';
import 'dotenv/config';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

export default s3;
