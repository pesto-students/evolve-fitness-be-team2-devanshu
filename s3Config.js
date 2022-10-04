const S3 = require("aws-sdk/clients/s3");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;


exports.s3Uploadv3 = async (featuredImageUrl) => {
  const s3 = await new S3({
    region: process.env.AWS_REGIONs,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEYs,
  });
  const params = featuredImageUrl.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};

// exports.s3Uploadv3 = async (featuredImageUrl) => {
//   // const s3client = new S3Client();

//   const params = featuredImageUrl.map((file) => {
//     return {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `uploads/${uuid()}-${file.originalname}`,
//       Body: file.buffer,
//     };
//   });

//   return await Promise.all(params.map((param) => s3.upload(param)));
// };
