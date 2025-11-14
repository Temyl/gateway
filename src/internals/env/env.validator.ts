import * as Joi from 'joi';
import { AppEnv } from '../enums';



export default Joi.object({

    NODE_ENV: Joi.string()
        .valid(AppEnv.DEVELOPMENT, AppEnv.TEST, AppEnv.STAGING, AppEnv.PRODUCTION)
        .default(AppEnv.DEVELOPMENT),
    
    PORT: Joi.number().default(8113),

    SERVICE_NAME: Joi.string().default('notification_system'),
    RABBIT_MQ_URL: Joi.string().required(),

});