import { cwd } from "node:process";
import { join, basename } from "node:path";
import { existsSync, mkdirSync, cpSync, writeFileSync } from "node:fs";
import { intro, text, select } from "@clack/prompts";
import { multiselect, isCancel } from "@clack/prompts";
import { git, docker, prettier } from "./options.js";
import { terminate, directories } from "./utils.js";

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

  if (existsSync(targetDir) && directory?.trim()) {
    return terminate(
      `${directory} already exists. Please choose a different name 🤷`,
    );
  }

  const language = await select({
    message: "Pick your coding poison:",
    options: [
      { label: "TypeScript", value: "ts", hint: "Recommended ✨" },
      { label: "JavaScript", value: "js", hint: "Standard 📜" },
    ],
  });

  if (isCancel(language)) terminate("Process cancelled ❌");

  const devTools = await multiselect({
    message: "🛠️ Setting up core development tools...",
    options: [
      { label: "💅 Prettier", value: "prettier" },
      { label: "🐳 Docker (deployment + database)", value: "docker" },
      { label: "🔨 Git", value: "git" },
    ],
  });

  if (isCancel(devTools)) terminate("Process cancelled ❌");

  let db = null;

  if (devTools.includes("docker")) {
    db = await select({
      message: "Alright, pick your poison",
      options: [
        { label: "🐬 MySQL", value: "mysql", hint: "Old reliable 🛠️" },
        { label: "🐘 PostgreSQL", value: "postgres", hint: "Feature beast 🦁" },
        { label: "🍃 MongoDB", value: "mongodb", hint: "Flexible chaos ✨" },
      ],
    });
    if (isCancel(db)) terminate("Process cancelled ❌");
  }

  if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });

  const sourceDir = join(targetDir, "src");
  const publicDir = join(targetDir, "public");
  const template = join(rootDir, "templates", language);

  mkdirSync(publicDir, { recursive: true });
  cpSync(template, targetDir, { recursive: true });

  for (let dir of directories) {
    if (language !== "ts" && dir === "types") continue;
    const directoryPath = join(sourceDir, dir);
    mkdirSync(directoryPath, { recursive: true });
  }

  if (devTools.includes("docker") && db) {
    const docks = docker(db, dirName);

    for (let { content, filename } of docks) {
      const fullPath = join(targetDir, filename);
      writeFileSync(fullPath, content);
    }
  }

  if (devTools.includes("git")) {
    const gitPath = join(targetDir, ".gitignore");
    const { gitignoreContent } = git();
    writeFileSync(gitPath, gitignoreContent);
  }

  if (devTools.includes("prettier")) {
    const configurations = prettier();

    for (let { content, filename } of configurations) {
      const fullPath = join(targetDir, filename);
      writeFileSync(fullPath, content);
    }
  }
})();
