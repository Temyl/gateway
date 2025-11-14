import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import envSchema from "./env.validator";
import { AppEnv } from "../enums";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: process.env.NODE_ENV === AppEnv.PRODUCTION,
            validationSchema: envSchema,
            validationOptions: {
                abortEarly: false,
                stripUnknown: true,
                
            }
        })
    ]
})

export class EnvModule {}