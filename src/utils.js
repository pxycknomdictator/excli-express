import { cancel } from "@clack/prompts";

export function terminate(message) {
  cancel(message);
  process.exit(0);
}
