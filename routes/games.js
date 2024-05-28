import express from "express";
import {
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIfUsersAreSafe,
  checkIsGameExists,
  createGame,
  deleteGame,
  findAllGames,
  findGameById,
  updateGame,
  checkIsVoteRequest,
} from "../middlewares/games.js";
import {
  sendAllGames,
  sendGameById,
  sendGameCreated,
  sendGameDeleted,
  sendGameUpdated,
} from "../controllers/games.js";
import { checkAuth } from "../middlewares/auth.js";

const gamesRouter = express.Router();

gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.post(
  "/games",
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  createGame,
  sendGameCreated
);
gamesRouter.delete(
  "/games/:id",
  checkAuth,
  findGameById,
  deleteGame,
  sendGameDeleted
);
gamesRouter.put(
  "/games/:id",
  findGameById,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  updateGame,
  sendGameUpdated
);

export default gamesRouter;
