import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { winstonLogger } from ".";
import { AppLogger } from "./logger.services";


@Module({
    imports: [WinstonModule.forRoot(winstonLogger())],
    providers:[AppLogger],
    exports: [AppLogger],
})

export class LoggerModule {}
