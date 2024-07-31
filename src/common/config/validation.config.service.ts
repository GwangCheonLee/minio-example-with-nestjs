import { ValidationPipe } from '@nestjs/common';
import * as Joi from 'joi';

export const validationPipeConfig = () => {
  return new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  });
};

export const validationSchemaConfig = () => {
  return Joi.object({
    S3_REGION: Joi.string().required(),
    S3_ACCESS_KEY_ID: Joi.string().required(),
    S3_SECRET_ACCESS_KEY: Joi.string().required(),
    S3_ENDPOINT: Joi.string().required(),
  });
};
