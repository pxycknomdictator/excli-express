import { cancel } from "@clack/prompts";
import { fireShell, modifyPackageJson } from "./scripts.js";
import { dockerMongodb, dockerMysql, dockerPostgres } from "./docker.js";
import { join } from "node:path";
import { __dirname } from "./main.js";
import { cp } from "node:fs/promises";

export const directories: string[] = [
    "db",
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
    const packages: string[] = ["express", "cors", "helmet"];
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
