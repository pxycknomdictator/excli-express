import { join } from "node:path";
import type {
    GenerateFileArgs,
    Language,
    Logger,
    LoggerParams,
} from "../types";
import { appendLanguageExtension, generateFile } from "../utils";

function winstonLogger(language: Language) {
    console.log(language);

    return `console.log("Hello from winston")`;
}

function pinoLogger(language: Language) {
    console.log(language);

    return `console.log("Hello from pino")`;
}

function bunyanLogger(language: Language) {
    console.log(language);

    return `console.log("Hello from bunyan")`;
}

const loggerList = {
    winston: winstonLogger,
    pino: pinoLogger,
    bunyan: bunyanLogger,
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
            { fileLocation: loggerPath, fileContent: loggerContent(language) },
        ];

        await Promise.all(files.map((file) => generateFile({ ...file })));
    } catch (error) {
        throw new Error(`Failed to setup logger: ${error}`);
    }
}
