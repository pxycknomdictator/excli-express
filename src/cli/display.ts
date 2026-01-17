import { note, outro } from "@clack/prompts";
import type { ProjectConfig } from "src/types";

export function showCompletionMessage(config: ProjectConfig) {
    const { dirName, pkgManager } = config;

    if (pkgManager === "none") {
        note(
            `
To get started:
  cd ${dirName}

Install dependencies:
  npm install

Start development:
  npm run dev`,
            "📦 Setup Complete",
        );
    } else {
        note(
            `cd ${dirName}
${pkgManager} run dev`,
            "🚀 Ready to start",
        );
    }

    outro("Happy coding! ✨");
}
