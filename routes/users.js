import express from "express";
import {
  sendAllUsers,
  sendMe,
  sendUserById,
  sendUserCreated,
  sendUserDeleted,
  sendUserUpdated,
} from "../controllers/users.js";
import {
  checkEmptyNameAndEmail,
  checkIsUserExists,
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
  conversionToHash,
  checkEmptyPassword,
} from "../middlewares/users.js";
import { checkAuth } from "../middlewares/auth.js";
import { validateUser } from "../middlewares/validation.js";

const usersRouter = express.Router();

usersRouter.get("/me", checkAuth, sendMe);
usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.post(
  "/users",
  findAllUsers,
  validateUser,
  checkIsUserExists,
  checkEmptyPassword,
  checkEmptyNameAndEmail,
  checkAuth,
  conversionToHash,
  createUser,
  sendUserCreated
);
usersRouter.delete(
  "/users/:id",
  findUserById,
  checkAuth,
  deleteUser,
  sendUserDeleted
);
usersRouter.put(
  "/users/:id",
  findUserById,
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);

export default usersRouter;
