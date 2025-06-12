import { platform } from "node:process";
import { spawnSync, spawn } from "node:child_process";

export function hasPkManager(pkgM) {
  const command = platform !== "win32" ? "which" : "where";
  const result = spawnSync(command, [pkgM], { encoding: "utf-8" });

  return result.status === 0;
}

export function fireShell(command, args, targetDir = process.cwd()) {
  const child = spawn(command, args, {
    cwd: targetDir,
    stdio: "inherit",
    shell: true,
  });

  child.on("close", (code) => {
    if (code !== 0) console.error(`❌ Command failed with code ${code}`);
  });

  child.on("error", (err) =>
    console.error("❌ Failed to start command:", err.message),
  );
}
