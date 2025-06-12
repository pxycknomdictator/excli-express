import { cwd } from "node:process";
import { join, basename } from "node:path";
import { existsSync, mkdirSync, cpSync, writeFileSync } from "node:fs";
import { intro, text, select } from "@clack/prompts";
import { multiselect, isCancel } from "@clack/prompts";
import { hasPkManager } from "./scripts.js";
import { git, docker, prettier, env } from "./options.js";
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

  const pkgManager = await select({
    message: "Which package manager do you want to use?",
    options: [
      { label: "📦 npm", value: "npm", hint: "Slow & reliable 🐢" },
      { label: "🐱 yarn", value: "yarn", hint: "Cute & capable 🧶" },
      { label: "⚡ pnpm", value: "pnpm", hint: "Blazing fast 🚀" },
    ],
  });

  if (isCancel(pkgManager)) terminate("Process cancelled ❌");

  if (!hasPkManager(pkgManager)) {
    terminate(
      `❌ ${pkgManager} is not installed on your system! Please install it first.`,
    );
  }

  if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });

  const sourceDir = join(targetDir, "src");
  const publicDir = join(targetDir, "public");
  const template = join(rootDir, "templates", language);

  mkdirSync(publicDir, { recursive: true });
  cpSync(template, targetDir, { recursive: true });

  for (let { file, variables } of env()) {
    const fullPath = join(targetDir, file);
    writeFileSync(fullPath, variables);
  }

  for (let dir of directories) {
    if (language !== "ts" && dir === "types") continue;
    const directoryPath = join(sourceDir, dir);
    mkdirSync(directoryPath, { recursive: true });
  }

  if (devTools.includes("docker") && db) {
    for (let { content, filename } of docker(db, dirName)) {
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
    for (let { content, filename } of prettier()) {
      const fullPath = join(targetDir, filename);
      writeFileSync(fullPath, content);
    }
  }
})();
