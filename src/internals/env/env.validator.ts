import * as Joi from 'joi';
import { AppEnv } from '../enums';



export default Joi.object({
    DATABASE_RETRY: Joi.number().default(3),

    DATABASE_SSL:Joi.boolean().default(false),

    NODE_ENV: Joi.string()
        .valid(AppEnv.DEVELOPMENT, AppEnv.TEST, AppEnv.STAGING, AppEnv.PRODUCTION)
        .default(AppEnv.DEVELOPMENT),
    
    PORT: Joi.number().default(8113),

    PG_HOST: Joi.string().required(),
    PG_PORT: Joi.string().required(),
    PG_USER: Joi.string().required(),
    PG_PASSWORD: Joi.string().required(),
    PG_DATABASE: Joi.string().required(),

    TOKEN_STORE_URL: Joi.string().required(),
    APP_CACHE_URL: Joi.string().required(),

    SENCHAMP_PUBLIC_ACCESS_KEY: Joi.string().required(),
    SENDER_EMAIL: Joi.string().required(),
    JWT_SECRET_KEY: Joi.string().required(),

    CLOUDINARY_CLIENT_API_KEY: Joi.string().required(),
    CLOUDINARY_CLIENT_SECRET: Joi.string().required(),
    CLOUDINARY_CLOUD_NAME:Joi.string().required(),

    SERVICE_NAME: Joi.string().default('kopa-app'),


});