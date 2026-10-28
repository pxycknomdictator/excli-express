import { note, outro } from "@clack/prompts";
import type { ProjectConfig } from "../types";

export function showCompletionMessage(config: ProjectConfig) {
    const { pkgManager, directory, language } = config;

    const commands: string[] = [];

    if (directory) {
        commands.push(`cd ${directory}`);
    }

    if (language === "ts") {
        commands.push(`${pkgManager} run build`);
    }

    if (language === "js" || language === "ts") {
        commands.push(`${pkgManager} run dev`);
    }

    if (commands.length > 0) {
        note(commands.join("\n"), "🚀 Ready to start");
    }

    outro("Happy coding! ✨");
}
