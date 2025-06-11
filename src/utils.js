import { cancel } from "@clack/prompts";

export function terminate(message) {
  cancel(message);
  process.exit(0);
}

export function sleep(timer = 1500) {
  return new Promise((r) => setTimeout(r, timer));
}
