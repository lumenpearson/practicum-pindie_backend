import express from "express";
import { PORT } from "./config.js";
import { corsOptions } from "./middlewares/cors.js";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import connectToDatabase from "./database/connect.js";
import { apiRouter } from "./routes/apiRouter.js";
import cookieParser from "cookie-parser";
import { pageRouter } from "./routes/pageRouter.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
connectToDatabase();

app.use(
  cookieParser(),
  bodyParser.json(),
  express.static(path.join(__dirname, "public")),
  cors(corsOptions),
  pageRouter,
  apiRouter
);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
