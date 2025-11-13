import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import envSchema from "./env.validator";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: envSchema,
            validationOptions: {
                abortEarly: false,
                stripUnknown: true,
                
            }
        })
    ]
})

export class EnvModule {}