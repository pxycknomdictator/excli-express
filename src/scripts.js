import { platform } from "node:process";
import { spawnSync } from "node:child_process";

export function hasPkManager(pkgM) {
  const command = platform !== "win32" ? "which" : "where";
  const result = spawnSync(command, [pkgM], { encoding: "utf-8" });

  return result.status === 0;
}
