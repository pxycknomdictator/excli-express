import { note, outro } from "@clack/prompts";
import type { ProjectConfig } from "../types";

export function showCompletionMessage(config: ProjectConfig) {
    const { pkgManager, directory, language, database, databaseOrm } = config;

    const commands: string[] = [];

    if (directory) {
        commands.push(`cd ${directory}`);
    }

    if (databaseOrm === "drizzle" || databaseOrm === "prisma") {
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

    if (databaseOrm === "prisma") {
        addonSteps.push(
            `prisma:\n  - Run ${pkgManager} run db:generate to generate the Prisma client\n  - Run ${pkgManager} run db:push to update your database schema`,
        );
    }

    if (database) {
        addonSteps.push(
            `better-auth:\n  - Run ${pkgManager} run auth:schema to generate the auth schema\n  - Run ${pkgManager} run db:push to update your database\n  - Check ORIGIN & BETTER_AUTH_SECRET in .env and adjust it to your needs\n  - Visit /demo/better-auth route to view the demo`,
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
