#!/usr/bin/env node

import { cwd } from "node:process";
import { fileURLToPath } from "node:url";
import { join, basename, dirname } from "node:path";
import { existsSync, mkdirSync, cpSync, writeFileSync } from "node:fs";
import { spinner, isCancel, multiselect } from "@clack/prompts";
import { intro, text, select, outro, log } from "@clack/prompts";
import { fireShell, hasPkManager } from "./scripts.js";
import { prettier, env } from "./options.js";
import { database, installPackages, sleep } from "./utils.js";
import { terminate, directories, packageJsonInit } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.clear();
intro(
  "🔥 Express.js App Generator | ✨ We will scaffold your app in a few seconds..",
);

(async () => {
  const directory = (await text({
    message: "What should we name your server directory? 🎯",
    placeholder: "server (Hit Enter for current directory)",
  })) as string;

  if (isCancel(directory)) terminate("Process cancelled ❌");

  const rootDir = cwd();
  const targetDir = !directory?.trim() ? rootDir : join(rootDir, directory);
  const dirName = basename(targetDir) || "container_app";

  if (existsSync(targetDir) && directory?.trim()) {
    return terminate(
      `${directory} already exists. Please choose a different name 🤷`,
    );
  }

  const language = (await select({
    message: "Pick your coding Language:",
    options: [
      { label: "TypeScript", value: "ts", hint: "Recommended 🚀" },
      { label: "JavaScript", value: "js", hint: "Classic 💼" },
    ],
  })) as string;

  if (isCancel(language)) terminate("Process cancelled ❌");

  const devTools = (await multiselect({
    message: "🔧 Setting up core development tools...",
    options: [
      { label: "✨ Prettier", value: "prettier" },
      { label: "🐳 Docker (deployment + database)", value: "docker" },
      { label: "📝 Git", value: "git" },
    ],
  })) as string[];

  if (isCancel(devTools)) terminate("Process cancelled ❌");

  let db: string;

  if (devTools.includes("docker")) {
    db = (await select({
      message: "Alright, pick your database:",
      options: [
        { label: "🐬 MySQL", value: "mysql", hint: "Widely used 🌍" },
        {
          label: "🐘 PostgreSQL",
          value: "postgres",
          hint: "SQL powerhouse ⚡",
        },
        { label: "🍃 MongoDB", value: "mongodb", hint: "NoSQL flexible 🔄" },
      ],
    })) as string;

    if (isCancel(db)) terminate("Process cancelled ❌");
  }

  const pkgManager = (await select({
    message: "Which package manager would you ❤️  to use?",
    options: [
      { label: "📋 npm", value: "npm", hint: "Standard choice 🔧" },
      { label: "🧶 yarn", value: "yarn", hint: "Smooth workflow 💫" },
      { label: "⚡ pnpm", value: "pnpm", hint: "Lightning fast 🚀" },
    ],
  })) as string;

  if (isCancel(pkgManager)) terminate("Process cancelled ❌");

  if (!hasPkManager(pkgManager)) {
    terminate(
      `❌ ${pkgManager} is not installed on your system! Please install it first.`,
    );
  }

  const s1 = spinner({ indicator: "dots" });

  s1.start("Installation in progress ☕");
  if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });

  const sourceDir = join(targetDir, "src");
  const publicDir = join(targetDir, "public");

  const template = join(__dirname, "..", "templates", language);
  if (!existsSync(template)) terminate(`❌ Template not found at: ${template}`);

  mkdirSync(publicDir, { recursive: true });
  cpSync(template, targetDir, { recursive: true });

  for (const { file, variables } of env()) {
    const fullPath = join(targetDir, file);
    writeFileSync(fullPath, variables);
  }

  for (const dir of directories) {
    if (language !== "ts" && dir === "types") continue;
    const directoryPath = join(sourceDir, dir);
    mkdirSync(directoryPath, { recursive: true });
  }

  if (devTools.includes("prettier")) {
    for (const { content, filename } of prettier()) {
      const fullPath = join(targetDir, filename);
      writeFileSync(fullPath, content);
    }
  }

  if (devTools.includes("git")) {
    await fireShell("npx", ["gitignore", "node"], targetDir);
  }

  if (devTools.includes("docker") && db!) {
    const compose = database(db!, dirName) as string;
    const composeFile = join(targetDir, "compose.yaml");
    const dockerignore = join(__dirname, "..", "templates", ".dockerignore");

    writeFileSync(composeFile, compose, { encoding: "utf-8" });
    cpSync(dockerignore, join(targetDir, ".dockerignore"));
  }

  await packageJsonInit(pkgManager, targetDir, language);
  await installPackages(pkgManager, targetDir, language, devTools);

  await sleep(1000);
  s1.stop(`Successfully created project \x1b[32m${dirName}\x1b[0m`);

  log.success(`Scaffolding project in ${targetDir}...`);

  outro(`🚀 You're all set!
Thanks for using Express App Generator 🙌
GitHub → https://github.com/pxycknomdictator
`);
})();
