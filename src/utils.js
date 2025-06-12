import { cancel } from "@clack/prompts";
import { fireShell, modifyPackageJson } from "./scripts.js";
import { dockerMongodb, dockerMysql, dockerPostgres } from "./docker.js";

export const directories = [
  "db",
  "controllers",
  "routes",
  "middlewares",
  "services",
  "types",
  "utils",
  "models",
];

export function terminate(message) {
  cancel(message);
  process.exit(0);
}

export function sleep(timer = 1500) {
  return new Promise((r) => setTimeout(r, timer));
}

export function database(db, name) {
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

export async function packageJsonInit(pkgManager, targetDir, language) {
  try {
    let args = [];

    if (pkgManager === "npm") args = ["init", "-y"];
    else if (pkgManager === "pnpm" || pkgManager === "yarn") args = ["init"];
    else throw new Error("Unsupported package manager");

    await fireShell(pkgManager, args, targetDir);
    modifyPackageJson(targetDir, language);
  } catch (err) {
    console.error(`❌ ${pkgManager} command failed: ${err.message}`);
  }
}

export async function installPackages(
  pkgManager,
  targetDir,
  language,
  devTools,
) {
  let packages = ["express"];
  let devPackages = [];

  if (devTools.includes("prettier")) devPackages.push("prettier");

  if (language === "ts") {
    devPackages.push("@types/node", "@types/express", "typescript");
  }

  const installCmd = pkgManager === "npm" ? "install" : "add";
  await fireShell(pkgManager, [installCmd, ...packages], targetDir);

  if (devPackages.length > 0) {
    await fireShell(pkgManager, [installCmd, ...devPackages, "-D"], targetDir);
  }
}
