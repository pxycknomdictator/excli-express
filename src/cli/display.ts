import { note, outro } from "@clack/prompts";
import type { ProjectConfig } from "../types";

export function showCompletionMessage(config: ProjectConfig) {
    const { pkgManager, directory, language, database, databaseOrm, auth } =
        config;

    const commands: string[] = [];

    if (directory) {
        commands.push(`cd ${directory}`);
    }

    if (databaseOrm === "drizzle") {
        if (database !== "sqlite") {
            commands.push(`${pkgManager} run db:up`);
        }

        commands.push(`${pkgManager} run db:generate`);
        commands.push(`${pkgManager} run db:push`);
    }

    if (language === "ts") {
        commands.push(`${pkgManager} run build`);
    }

    if (language === "js" || language === "ts") {
        commands.push(`${pkgManager} run dev`);
    }

    const projectSteps = commands
        .map((command, index) => `${index + 1}: ${command}`)
        .join("\n");

    const addonSteps: string[] = [];

    if (databaseOrm === "drizzle") {
        addonSteps.push(
            `drizzle:\n  - Run ${pkgManager} run db:up to start the docker container\n  - Run ${pkgManager} run db:push to update your database schema`,
        );
    }

    if (auth === "better-auth") {
        addonSteps.push(
            `better-auth:\n  - Run ${pkgManager} run auth:schema to generate the auth schema\n  - Run ${pkgManager} run db:push to update your database\n  - Check ORIGIN & BETTER_AUTH_SECRET in .env and adjust it to your needs\n  - Visit /demo/better-auth route to view the demo`,
        );
    }

    if (auth === "clerk") {
        addonSteps.push(
            `clerk:\n  - Set CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in .env\n  - Protect routes with the generated auth middleware`,
        );
    }

    let message = `📁 Project steps\n\n${projectSteps}`;

    if (addonSteps.length > 0) {
        message += `\n\n🧩 Add-on steps\n\n${addonSteps.join("\n\n")}`;
    }

    message += "\n\nTo close the dev server, hit Ctrl-C";

    note(message, "What's next?");

    outro("Happy coding! ✨");
}
