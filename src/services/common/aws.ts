import {
  S3Client,
  PutObjectCommand,
  S3ClientConfig
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import winston from "winston";

dotenv.config();

const s3Config: S3ClientConfig = {
  region: process.env.AWS_REGION ?? "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
  logger: winston.createLogger({
    level: "warn",
    transports: [new winston.transports.Console({ level: "warn" })],
  }),
};

const s3 = new S3Client(s3Config);

async function uploadFileToS3(fileStream: any, originalname: string, mimetype:string) {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${Date.now()}-${originalname}`,
      Body: fileStream,
      ContentType: mimetype,
    };
  
    const putObjectCommand = new PutObjectCommand(params);
    await s3.send(putObjectCommand);
    
    const s3ObjectUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  
    return s3ObjectUrl;
  } catch (err) {
    return err;
  }
}

export default uploadFileToS3;
