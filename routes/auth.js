const authRouter = require("express").Router();
const { login } = require("../controllers/auth");
const { sendUserCreated } = require("../controllers/users");
const {
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    hashPassword,
    createUser,
} = require("../middlewares/users");

authRouter.post("/auth/login", login);
authRouter.post(
    "/auth/register",
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    hashPassword,
    createUser,
    sendUserCreated
);

module.exports = authRouter;
