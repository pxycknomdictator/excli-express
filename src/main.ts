#!/usr/bin/env node

import { cwd } from "node:process";
import { fileURLToPath } from "node:url";
import { join, basename, dirname } from "node:path";
import { existsSync } from "node:fs";
import { mkdir, cp } from "node:fs/promises";
import figlet from "figlet";
import { spinner, isCancel, multiselect } from "@clack/prompts";
import { text, select, outro, log } from "@clack/prompts";
import { fireShell, hasPkManager } from "@/scripts";
import { installPackages, setupDirectories, setupDocker } from "@/utils";
import { terminate, setupPrettier, setupEnvironmentSecret } from "@/utils";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

console.clear();

const banner = figlet.textSync("Excli", {
    font: "Standard",
    horizontalLayout: "full",
    verticalLayout: "full",
});

console.log(`\x1b[96m ${banner} \x1b[0m`);

(async () => {
    const directory = (await text({
        message: "What should we name your server directory?",
        placeholder: "server (press Enter for current directory)",
    })) as string;

    if (isCancel(directory)) terminate("Process cancelled ❌");

    const rootDir = cwd();
    const targetDir = !directory?.trim() ? rootDir : join(rootDir, directory);
    const dirName = basename(targetDir) || "container_app";

    if (existsSync(targetDir) && directory?.trim()) {
        return terminate(
            `${directory} already exists. Please choose a different name.`,
        );
    }

    const language = (await select({
        message: "Select your programming language:",
        options: [
            { label: "TypeScript", value: "ts" },
            { label: "JavaScript", value: "js" },
        ],
    })) as string;

    if (isCancel(language)) terminate("Process cancelled ❌");

    const mode = (await select({
        message: "Select project mode:",
        options: [
            { label: "Standard", value: "normal" },
            { label: "Production", value: "production" },
        ],
    })) as string;

    if (isCancel(mode)) terminate("Process cancelled ❌");

    let devTools: string[] = [];
    let db: string | undefined;

    if (mode === "production") {
        devTools = (await multiselect({
            message: "Select development tools:",
            options: [
                { label: "Prettier", value: "prettier" },
                { label: "Docker (deployment + database)", value: "docker" },
                { label: "Git", value: "git" },
            ],
        })) as string[];

        if (isCancel(devTools)) terminate("Process cancelled ❌");

        if (devTools.includes("docker")) {
            db = (await select({
                message: "Select your database:",
                options: [
                    { label: "MySQL", value: "mysql" },
                    { label: "PostgreSQL", value: "postgres" },
                    { label: "MongoDB", value: "mongodb" },
                ],
            })) as string;

            if (isCancel(db)) terminate("Process cancelled ❌");
        }
    }

    const pkgManager = (await select({
        message: "Select your package manager:",
        options: [
            { label: "npm", value: "npm" },
            { label: "yarn", value: "yarn" },
            { label: "pnpm", value: "pnpm" },
        ],
    })) as string;

    if (isCancel(pkgManager)) terminate("Process cancelled ❌");

    if (!hasPkManager(pkgManager)) {
        terminate(
            `❌ ${pkgManager} is not installed on your system! Please install it first.`,
        );
    }

    const s1 = spinner({ indicator: "dots" });
    s1.start("Installing dependencies...");

    if (!existsSync(targetDir)) await mkdir(targetDir, { recursive: true });

    const sourceDir = join(targetDir, "src");
    const publicDir = join(targetDir, "public");
    const template = join(__dirname, "..", "templates", language);

    if (!existsSync(template)) {
        terminate(`❌ Template not found at: ${template}`);
    }

    await Promise.all([
        mkdir(publicDir, { recursive: true }),
        cp(template, targetDir, { recursive: true }),
        setupEnvironmentSecret(targetDir),
    ]);

    if (mode === "production") {
        await setupDirectories(language, sourceDir);
        if (devTools.includes("prettier")) await setupPrettier(targetDir);
        if (devTools.includes("git")) {
            await fireShell("npx", ["gitignore", "node"], targetDir);
        }
        await Promise.all([
            setupDocker(devTools, db!, dirName),
            installPackages(pkgManager, targetDir, language, devTools, dirName),
        ]);
    } else {
        await installPackages(pkgManager, targetDir, language, [], dirName);
    }

    s1.stop(`Successfully created project \x1b[32m${dirName}\x1b[0m`);

    log.success(`Scaffolding project in ${targetDir}...`);

    outro(`cd ${dirName}
    ${pkgManager} run dev
    `);
})();
