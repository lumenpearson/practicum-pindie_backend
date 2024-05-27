// routes/main.js
const mainRoute = require("express").Router();

mainRoute.get("/", (req, res) => {
  fs.readFile("./public/index.html", "utf-8").then((data) => {
    res.header("Content-Type", "text/html").send(data);
  });
});

module.exports = mainRoute;
