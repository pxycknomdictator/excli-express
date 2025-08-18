import { join } from "node:path";
import { __dirname } from "./main.js";
import { cancel } from "@clack/prompts";
import { env, prettier } from "./options.js";
import { cp, mkdir, writeFile } from "node:fs/promises";
import { fireShell, modifyPackageJson } from "./scripts.js";
import { dockerMongodb, dockerMysql, dockerPostgres } from "./docker.js";

export const directories: string[] = [
    "config",
    "controllers",
    "routes",
    "middlewares",
    "services",
    "types",
    "utils",
    "models",
];

export function terminate(message: string) {
    cancel(message);
    process.exit(0);
}

export function database(db: string, name: string) {
    switch (db) {
        case "mongodb":
            return dockerMongodb(name);
        case "postgres":
            return dockerPostgres(name);
        case "mysql":
            return dockerMysql(name);
        default:
            return null;
    }
}

export async function installPackages(
    pkgManager: string,
    targetDir: string,
    language: string,
    devTools: string[],
    dirName: string,
) {
    const packages: string[] = [
        "express",
        "cors",
        "helmet",
        "express-rate-limit",
    ];

    const devPackages: string[] = [];
    const packageJson = join(__dirname, "..", "templates", "package.json");

    await cp(packageJson, join(targetDir, "package.json"));
    await modifyPackageJson(targetDir, language, dirName);

    if (devTools.includes("prettier")) devPackages.push("prettier");

    if (language === "ts") {
        devPackages.push(
            "tsx",
            "@types/node",
            "@types/express",
            "typescript",
            "@types/cors",
        );
    }

    const installCmd = pkgManager === "npm" ? "install" : "add";
    await fireShell(pkgManager, [installCmd, ...packages], targetDir);

    if (devPackages.length > 0) {
        await fireShell(
            pkgManager,
            [installCmd, ...devPackages, "-D"],
            targetDir,
        );
    }
}

export async function setupEnvironmentSecret(targetDir: string) {
    for (const { file, variables } of env()) {
        const fullPath = join(targetDir, file);
        await writeFile(fullPath, variables);
    }
}

export async function setupDirectories(language: string, sourceDir: string) {
    for (const dir of directories) {
        if (language !== "ts" && dir === "types") continue;
        const directoryPath = join(sourceDir, dir);
        await mkdir(directoryPath, { recursive: true });
    }
}

export async function setupPrettier(targetDir: string) {
    for (const { content, filename } of prettier()) {
        const fullPath = join(targetDir, filename);
        await writeFile(fullPath, content);
    }
}

export async function setupDocker(
    devTools: string[],
    db: string,
    dirName: string,
    targetDir: string,
) {
    if (devTools.includes("docker") && db!) {
        const compose = database(db!, dirName) as string;
        const composeFile = join(targetDir, "compose.yaml");
        const DockerFile = join(targetDir, "Dockerfile");
        const dockerignore = join(
            __dirname,
            "..",
            "templates",
            ".dockerignore",
        );

        await Promise.all([
            writeFile(DockerFile, "", { encoding: "utf-8" }),
            writeFile(composeFile, compose, { encoding: "utf-8" }),
            cp(dockerignore, join(targetDir, ".dockerignore")),
        ]);
    }
}
