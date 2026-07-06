import { join } from "node:path";
import type { GenerateFileArgs, Logger, LoggerParams } from "../types";
import { appendLanguageExtension, generateFile } from "../utils";

function winstonLogger() {
    return `import winston from "winston";

const { combine, timestamp, printf, colorize, errors } = winston.format;

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: combine(
        colorize(),
        timestamp(),
        errors({ stack: true }),
        printf(({ level, message, timestamp, ...meta }) => {
            const metaString = Object.keys(meta).length
                ? \` \${JSON.stringify(meta)}\`
                : "";
            return \`\${timestamp} [\${level}]: \${message}\${metaString}\`;
        }),
    ),
    transports: [new winston.transports.Console()],
});
`;
}

function pinoLogger() {
    return `import pino from "pino";

export const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
        pipeline: [{ target: "pino-pretty", options: { colorize: true } }],
    },
});
`;
}

const loggerList = {
    winston: winstonLogger,
    pino: pinoLogger,
};

export async function setupLogger({
    targetDir,
    logger,
    language,
}: LoggerParams): Promise<void> {
    try {
        const [loggerLang] = appendLanguageExtension(language, "logger");
        const loggerPath = join(
            targetDir,
            "src",
            "utils",
            loggerLang as string,
        );
        const loggerContent = loggerList[logger as Logger];

        const files: GenerateFileArgs[] = [
            { fileLocation: loggerPath, fileContent: loggerContent() },
        ];

        await Promise.all(files.map((file) => generateFile({ ...file })));
    } catch (error) {
        throw new Error(`Failed to setup logger: ${error}`);
    }
}
