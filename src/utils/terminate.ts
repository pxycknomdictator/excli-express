import { cancel } from "@clack/prompts";

export function terminate(message: string): never {
    cancel(message);
    process.exit(0);
}
