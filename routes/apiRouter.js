import express from "express";
import gamesRouter from "./games.js";
import usersRouter from "./users.js";
import categoriesRouter from "./categories.js";
import { authRouter } from "./auth.js";

const apiRouter = express.Router();

apiRouter.use("/api", authRouter, gamesRouter, usersRouter, categoriesRouter);

export { apiRouter };
