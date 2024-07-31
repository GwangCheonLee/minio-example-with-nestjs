import { Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('S3_SECRET_ACCESS_KEY'),
      },
      endpoint: this.configService.get<string>('S3_ENDPOINT'),
      forcePathStyle: true,
    });
  }

  async uploadFile(
    bucketName: string,
    key: string,
    body: Buffer | Readable | string,
  ): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
    });

    try {
      await this.s3Client.send(command);
      console.log(`File uploaded successfully to ${bucketName}/${key}`);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  async getFile(bucketName: string, key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    try {
      const response = await this.s3Client.send(command);
      const stream = response.Body as Readable;
      const chunks: any[] = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      return Buffer.concat(chunks);
    } catch (error) {
      console.error('Error getting file:', error);
      throw error;
    }
  }

  async generateDownloadSignedUrl(
    bucketName: string,
    key: string,
    expiresIn: number,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    try {
      const url = await getSignedUrl(this.s3Client, command, { expiresIn });
      console.log(`Generated presigned URL for download: ${url}`);
      return url;
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      throw error;
    }
  }

  async generateUploadSignedUrl(
    bucketName: string,
    key: string,
    expiresIn: number,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    try {
      const url = await getSignedUrl(this.s3Client, command, { expiresIn });
      console.log(`Generated signed URL for upload: ${url}`);
      return url;
    } catch (error) {
      console.error('Error generating signed URL:', error);
      throw error;
    }
  }
}
