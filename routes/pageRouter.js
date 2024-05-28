import express from "express";
import { sendDashBoard, sendIndex } from "../controllers/auth.js";
import { checkAuth, checkCookiesJWT } from "../middlewares/auth.js";

const pageRouter = express.Router();

pageRouter.get("/", sendIndex);
pageRouter.get("/admin/**", checkCookiesJWT, sendDashBoard);
export { pageRouter };
