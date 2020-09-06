import 'dotenv/config';
// import s3Provider from '../providers/S3Provider';

const S3Service = (provider) => {
  const upload = async (fileName, buffer, contentType) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${process.env.AWS_S3_DIRECTORY}/${fileName}`,
      Body: buffer,
      ContentType: contentType,
    };
    return provider.upload(params).promise();
  };

  return {
    upload
  }
};

export default S3Service;
