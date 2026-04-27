const { test, expect } = require("@playwright/test");

test("health endpoint returns healthy", async ({ request }) => {
  const response = await request.get("/health");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("healthy");
});
