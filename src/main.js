import { join } from "node:path";
import { cwd } from "node:process";
import { existsSync, mkdirSync, cpSync } from "node:fs";
import { intro, text, select, multiselect, isCancel } from "@clack/prompts";
import { terminate } from "./utils.js";
import { directories } from "./options.js";

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
    const publicDir = join(targetDir, "public");
    const template = join(rootDir, "templates", language);

    mkdirSync(publicDir, { recursive: true });
    cpSync(template, targetDir, { recursive: true });
  }

  for (let dir of directories) {
    if (language !== "ts" && dir === "types") continue;

    const directory = join(sourceDir, dir);
    mkdirSync(directory, { recursive: true });
  }

  const devTools = await multiselect({
    message: "🛠️ Setting up core development tools...",
    options: [
      { label: "💅 Prettier", value: "prettier" },
      { label: "🐳 Docker (deployment + database)", value: "docker" },
    ],
  });

  if (isCancel(devTools)) terminate("Process cancelled ❌");
})();
