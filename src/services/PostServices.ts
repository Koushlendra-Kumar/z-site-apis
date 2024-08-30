import Post from "@src/models/Post";
import { Request, Response } from "express";
import uploadFileToS3 from "./common/aws";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import fs from 'fs'

function getAll() {}

async function addOne(req: Request, res: Response) {
  const file = req.file as Express.Multer.File;
  const fileStream = fs.createReadStream(file.path);

  try {
    const s3ObjectUrl:string = await uploadFileToS3(fileStream, file.originalname, file.mimetype);

    fs.unlinkSync(file.path);

    res.status(HttpStatusCodes.OK).json({ s3ObjectUrl });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to upload file' });
  }
  
}

export default {
  getAll,
  addOne,
};
