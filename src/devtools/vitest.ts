export function generateTestTemplate() {
    return `import request from "supertest";
import { app } from "../src/app.js";
import { describe, it, expect } from "vitest";

describe("GET /", () => {
    it("should return the correct HTML heading", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/html/);
        expect(response.text).toBe("<h1>Thanks for using Express Cli</h1>");
    });
    it("should contain the expected text content", async () => {
        const response = await request(app).get("/");
        expect(response.text).toContain("Express Cli");
    });
});
`;
}
