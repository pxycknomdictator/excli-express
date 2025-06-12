import { join } from "node:path";
import { platform } from "node:process";
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync, spawn } from "node:child_process";
import { jsScripts, tsScripts } from "./options.js";

export function hasPkManager(pkgM) {
  const command = platform !== "win32" ? "which" : "where";
  const result = spawnSync(command, [pkgM], { encoding: "utf-8" });

  return result.status === 0;
}

export function fireShell(command, args, targetDir = process.cwd()) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: targetDir,
      stdio: "inherit",
      shell: true,
    });

    child.on("close", (code) => {
      if (code !== 0) reject(new Error(`Command failed with code ${code}`));
      else resolve();
    });

    child.on("error", (err) => reject(err));
  });
}

export function modifyPackageJson(targetDir, language) {
  const fullPath = join(targetDir, "package.json");
  const pkg = JSON.parse(readFileSync(fullPath, { encoding: "utf-8" }));

  pkg.scripts = language === "ts" ? { ...tsScripts } : { ...jsScripts };
  pkg.license = "MIT";
  pkg.type = "module";
  pkg.main = `src/main.${language}`;

  writeFileSync(fullPath, JSON.stringify(pkg, null, 2));
}
