import { cp, mkdir, writeFile } from "node:fs/promises";
import type {
    GenerateFileArgs,
    INTERACTIVE_PROMPTS,
    Language,
    ProjectConfig,
} from "../types";
import { betterAuthAdapterSupport } from "../config";

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
    return options.map(({ label, emoji, value, disabled, hint }) => ({
        label: `${label} ${emoji}`,
        value,
        disabled,
        hint,
    }));
}

export function appendLanguageExtension(lang: Language, ...paths: string[]) {
    const extension = lang === "ts" ? ".ts" : ".js";
    const files = paths.map((file) => file.concat(extension));
    return files;
}

export function getAuthLibraryOptions(
    databaseOrm?: string,
): INTERACTIVE_PROMPTS[] {
    return [
        {
            label: "Better Auth",
            emoji: "🔒",
            value: "better-auth",
            disabled: !betterAuthAdapterSupport.includes(databaseOrm ?? ""),
            hint: "Better auth Works only with supported ORMs (Drizzle, Prisma, mongodb native driver)",
        },
        {
            label: "Clerk",
            emoji: "🔑",
            value: "clerk",
            disabled: false,
        },
    ];
}
