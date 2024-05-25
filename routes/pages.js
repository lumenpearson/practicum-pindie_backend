const pagesRouter = require("express").Router();
const { AuthorizePages } = require("../middlewares/pages.js");
const { sendLogin, sendDashboard } = require("../controllers/pages.js");

pagesRouter.get("/admin/login", AuthorizePages, sendLogin);
pagesRouter.get("/admin", AuthorizePages, sendDashboard);

module.exports = pagesRouter;
