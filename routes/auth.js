const authRouter = require("express").Router();
const { Authorize } = require("../middlewares/auth.js");
const { login, signup, sendMe } = require("../controllers/auth.js");
const {
  findAllUsers,
  hashPassword,
  checkEmptyNameAndEmailAndPassword,
  validateUsername,
  validateEmail,
  checkIsUserExists,
} = require("../middlewares/users");

authRouter.post("/auth/login", login);
authRouter.post(
  "/auth/signup",
  checkEmptyNameAndEmailAndPassword,
  validateUsername,
  validateEmail,
  hashPassword,
  findAllUsers,
  checkIsUserExists,
  signup
);
authRouter.get("/auth/me", Authorize, sendMe);

module.exports = authRouter;
