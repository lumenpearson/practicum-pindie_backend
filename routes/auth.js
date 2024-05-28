import express from "express";
import { login } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/auth/login", login);

export { authRouter };
