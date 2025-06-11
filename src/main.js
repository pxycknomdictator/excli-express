import { join } from "node:path";
import { cwd } from "node:process";
import { existsSync, mkdirSync } from "node:fs";
import { intro, text, isCancel } from "@clack/prompts";
import { terminate } from "./utils.js";

console.clear();
intro("🔥 Express.js App Generator | Build your dreams, faster! ⚡");

(async () => {
  const directory = await text({
    message: "What should we name your server directory? 🎯",
    placeholder: "server (Hit Enter for current directory)",
  });

  if (isCancel(directory)) terminate("Process cancelled ❌");

  const rootDir = cwd();
  const targetDir = !directory?.trim() ? rootDir : join(rootDir, directory);

  const condition = directory !== undefined && !existsSync(targetDir);
  if (condition) mkdirSync(targetDir, { recursive: true });
})();
