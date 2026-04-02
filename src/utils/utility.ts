import { cp, mkdir, writeFile } from "node:fs/promises";
import type {
    GenerateFileArgs,
    INTERACTIVE_PROMPTS,
    Language,
    ProjectConfig,
} from "../types";

export async function makeDirectory(directoryPath: string) {
    try {
        await mkdir(directoryPath, { recursive: true });
    } catch (error) {
        throw new Error(`Failed to create directory: ${error}`);
    }
}

export async function copy(
    config: Pick<ProjectConfig, "templatePath" | "targetDir">,
) {
    const { templatePath: copyPath, targetDir } = config;
    try {
        await cp(copyPath, targetDir, { recursive: true });
    } catch (error) {
        throw new Error(`Failed to copy: ${error}`);
    }
}

export async function generateFile(fileArgs: GenerateFileArgs) {
    try {
        const { fileLocation, fileContent } = fileArgs;
        await writeFile(fileLocation, fileContent, "utf-8");
    } catch (error) {
        throw new Error(`failed to generate file: ${error}`);
    }
}

export function generateOptions(options: INTERACTIVE_PROMPTS[]) {
    return options.map(({ label, emoji, value }: INTERACTIVE_PROMPTS) => ({
        label: `${label} ${emoji}`,
        value: value,
    }));
}

export function appendLanguageExtension(lang: Language, ...paths: string[]) {
    const extension = lang === "ts" ? ".ts" : ".js";
    const files = paths.map((file) => file.concat(extension));
    return files;
}
