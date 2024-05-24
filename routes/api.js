const authRouter = require("./auth");
const gamesRouter = require("./games");
const usersRouter = require("./users");
const pingRouter = require("./ping");
const categoriesRouter = require("./categories");

const apiRouter = require("express").Router();

apiRouter.use("/api", authRouter);
apiRouter.use("/api", gamesRouter);
apiRouter.use("/api", usersRouter);
apiRouter.use("/api", pingRouter);
apiRouter.use("/api", categoriesRouter);

module.exports = apiRouter;
