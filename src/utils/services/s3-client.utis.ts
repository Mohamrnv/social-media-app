import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import fs, { ReadStream } from 'fs'
interface IInputObjectCommandInput extends PutObjectCommandInput {
    Body: string | Buffer | ReadStream
}

export class S3ClientService {
    private s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
        }
    });

    private key_folder = process.env.AWS_KEY_FOLDER as string;

    async getFileWithSignedUrl(key: string, expiresIn = 60) {
        const getCommand = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME as string,
            Key: key
        });

        return await getSignedUrl(this.s3Client, getCommand, { expiresIn });
    }

    async uploadFileOnS3(file: Express.Multer.File, key: string) {
        const keyName = `${this.key_folder}/${key}/${Date.now()}-${file.originalname}`;
        console.log('The key name is', keyName);
        console.log('The file into', file);

        const params: IInputObjectCommandInput = {
            Bucket: process.env.BUCKET_NAME as string,
            Key: keyName,
            Body: file.buffer,
            ContentType: file.mimetype
        };

        const putCommand = new PutObjectCommand(params);

        await (this.s3Client as any).send(putCommand);
        const signdUrl = await this.getFileWithSignedUrl(keyName);
        return {
            key: keyName,
            url: signdUrl
        }


    }
}
