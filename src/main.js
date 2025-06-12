import { cwd } from "node:process";
import { join, basename } from "node:path";
import { existsSync, mkdirSync, cpSync, writeFileSync } from "node:fs";
import { intro, text, select, multiselect, isCancel } from "@clack/prompts";
import { directories } from "./options.js";
import { database, terminate } from "./utils.js";

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
  const dirName = basename(targetDir) || "container_app";

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

  if (devTools.includes("docker")) {
    const db = await select({
      message: "Alright, pick your poison",
      options: [
        { label: "🐬 MySQL", value: "mysql", hint: "Old reliable 🛠️" },
        { label: "🐘 PostgreSQL", value: "postgres", hint: "Feature beast 🦁" },
        { label: "🍃 MongoDB", value: "mongodb", hint: "Flexible chaos ✨" },
      ],
    });

    if (isCancel(db)) terminate("Process cancelled ❌");
    const config = database(db, dirName);

    if (config?.trim()) {
      const docker_compose = join(targetDir, "compose.yaml");
      writeFileSync(docker_compose, config);
    }
  }
})();
