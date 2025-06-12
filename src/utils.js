import { cancel } from "@clack/prompts";
import { dockerMongodb, dockerMysql } from "./options.js";

export function terminate(message) {
  cancel(message);
  process.exit(0);
}

export function sleep(timer = 1500) {
  return new Promise((r) => setTimeout(r, timer));
}

export function database(db, name) {
  switch (db) {
    case "mongodb":
      return dockerMongodb(name);
    case "postgres":
      return null;
    case "mysql":
      return dockerMysql(name);
    default:
      return null;
  }
}
