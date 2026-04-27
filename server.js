const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Lab 6 demo app is running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

module.exports = app;
