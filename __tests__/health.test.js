const http = require("http");

describe("GET /health", () => {
  test("returns healthy", (done) => {
    const req = http.get("http://localhost:3000/health", (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        expect(res.statusCode).toBe(200);
        expect(data).toContain("healthy");
        done();
      });
    });

    req.on("error", (err) => {
      done(err);
    });
  });
});
