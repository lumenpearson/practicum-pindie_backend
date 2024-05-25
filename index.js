const audit = require("express-requests-logger");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const { MONGODB_CONN, PORT, LOGIN_PATH, URL } = require("./config");

const { cors } = require("./middlewares/cors");
const { connectToDatabase } = require("./database/connect");
const { logger } = require("./logger");

const { apiRouter, pagesRouter } = require("./routes");
const app = express();

connectToDatabase(MONGODB_CONN);

app.use(
  audit({
    logger: logger,
    excludeURLs: ["ping"],
    levels: {
      "1xx": "info",
      "2xx": "info",
      "3xx": "info",
      401: "warn",
      403: "warn",
      "4xx": "info",
      503: "warn",
      "5xx": "error",
    },
  })
);
app.use(
  cors,
  cookieParser(),
  bodyParser.json(),
  apiRouter,
  pagesRouter,
  express.static(path.join(path.resolve(), "./public"))
);

app.get("/", (req, res) => {
  res.redirect(LOGIN_PATH);
});

app.listen(PORT, async () => {
  let chalk;
  try {
    // Use dynamic import to import chalk as an ES Module
    const chalkModule = await import("chalk");
    chalk = chalkModule.default;
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    // If dynamic import fails, fallback to requiring chalk as a CommonJS module
    chalk = require("chalk");
  }

  logger.info(
    chalk.whiteBright("❥ App is running on "),
    chalk.underline.cyan(PORT),
    chalk.whiteBright("port."),
    chalk.yellow("\n❥ Join now ☞"),
    chalk.underline.green(`${URL}\n`)
  );
});
