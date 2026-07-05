import { note, outro } from "@clack/prompts";
import type { ProjectConfig } from "../types";

export function showCompletionMessage(config: ProjectConfig) {
    const { pkgManager, directory } = config;
    const hasDirectory = typeof directory === "string" && directory.length > 0;

    if (pkgManager === "none" && !hasDirectory) {
        note(
            `
Install dependencies:
  npm install

Start development:
  npm run dev`,
            "📦 Setup Complete",
        );
    } else if (pkgManager === "none" && hasDirectory) {
        note(
            `
To get started:
  cd ${directory}

Install dependencies:
  npm install

Start development:
  npm run dev`,
            "📦 Setup Complete",
        );
    } else if (pkgManager !== "none" && hasDirectory) {
        note(
            `cd ${directory}
${pkgManager} run dev`,
            "🚀 Ready to start",
        );
    } else {
        note(`${pkgManager} run dev`, "🚀 Ready to start");
    }

    outro("Happy coding! ✨");
}
