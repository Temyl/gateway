import * as winston from "winston";
import { FileSize, LOGGER_LEVEL } from "../enums";
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';


export function winstonLogger(): winston.LoggerOptions {
    return {
        level: LOGGER_LEVEL.INFO,
        format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
        ),

        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    nestWinstonModuleUtilities.format.nestLike(
                        'KopaApp', 
                        { prettyPrint: true }
                    ),
                )
            }),

            // new winston.transports.DailyRotateFile({
            //     filename: 'logs/kopa-%DATE%.log',
            //     datePattern: 'YYYY-MM-DD',
            //     zippedArchive: true,
            //     maxSize: `${20 * FileSize.MB}b`,
            //     maxFiles: '14d',
            // }),
        ]
    }
}