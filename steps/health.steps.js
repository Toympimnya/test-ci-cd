const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const http = require("http");

let response = { statusCode: 0, body: "" };

Given("the API server is running", function () {
  // Server startup is handled in CI step before test execution.
});

When("I request {string}", function (path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:3000${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        response = { statusCode: res.statusCode, body: data };
        resolve();
      });
    });

    req.on("error", (err) => reject(err));
  });
});

Then("response status should be {int}", function (expectedStatus) {
  assert.strictEqual(response.statusCode, expectedStatus);
});

Then("response body should contain {string}", function (expectedPart) {
  assert.ok(response.body.includes(expectedPart));
});
