const request = require("supertest");
const app = require("../server");

describe("GET /health", () => {
  test("returns healthy", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("healthy");
  });
});
