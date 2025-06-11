import { join } from "node:path";
import { cwd } from "node:process";
import { existsSync, mkdirSync, cpSync } from "node:fs";
import { intro, text, select, isCancel } from "@clack/prompts";
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

  const language = await select({
    message: "Pick your coding poison:",
    options: [
      { label: "TypeScript", value: "ts", hint: "Recommended ✨" },
      { label: "JavaScript", value: "js", hint: "Standard 📜" },
    ],
  });

  if (isCancel(language)) terminate("Process cancelled ❌");

  const sourceDir = join(targetDir, "src");

  if (!existsSync(sourceDir)) {
    const template = join(rootDir, "templates", language);
    cpSync(template, targetDir, { recursive: true });
  }
})();
