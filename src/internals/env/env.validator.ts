import * as Joi from 'joi';
import { AppEnv } from '../enums';



export default Joi.object({

    NODE_ENV: Joi.string()
        .valid(AppEnv.DEVELOPMENT, AppEnv.TEST, AppEnv.STAGING, AppEnv.PRODUCTION)
        .default(AppEnv.DEVELOPMENT),
    
    PORT: Joi.number().default(8113),

   

    TOKEN_STORE_URL: Joi.string().required(),
    APP_CACHE_URL: Joi.string().required(),

    SERVICE_NAME: Joi.string().default('notification_system'),
    RABBIT_MQ_URL: Joi.string().required(),

    FIREBASE_CERTIFICATE_PATH: Joi.string().required(),

});