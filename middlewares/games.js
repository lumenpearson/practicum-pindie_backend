const games = require("../models/game");
const {
  ERR_CREATE_GAME,
  ERR_GAME_NOT_FOUND,
  ERR_UPDATE_GAME,
  ERR_DELETE_GAME,
  ERR_FILL_ALL_FIELDS,
  ERR_USER_CHANGES,
  ERR_SELECT_CATEGORY,
  ERR_GAME_EXISTS,
  ERR_VOTE_GAME,
  ERR_VOTE_CANCEL,
} = require("@/config");

const createGame = async (req, res, next) => {
  try {
    req.game = await games.create(req.body);
    next();
  } catch {
    res.status(400).send(ERR_CREATE_GAME);
  }
};

const findAllGames = async (req, res, next) => {
  const categoryNames = req.query["categories.name"];

  if (categoryNames && Array.isArray(categoryNames)) {
    req.gamesArray = await games.findGameByCategories(categoryNames);
    next();
  } else if (categoryNames) {
    req.gamesArray = await games.findGameByCategories([categoryNames]);
    next();
  } else {
    req.gamesArray = await games.find({}).populate("categories").populate({
      path: "users",
      select: "-password",
    });
    next();
  }
};

const findGameById = async (req, res, next) => {
  try {
    req.game = await games
      .findById(req.params.id)
      .populate("categories")
      .populate("users")
      .populate({
        path: "users",
        select: "-password",
      });
    next();
  } catch {
    res.status(404).send({ message: ERR_GAME_NOT_FOUND });
  }
};

const updateGame = async (req, res, next) => {
  try {
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch {
    res.status(400).send({ message: ERR_UPDATE_GAME });
  }
};

const deleteGame = async (req, res, next) => {
  try {
    req.game = await games.findByIdAndDelete(req.params.id);
    next();
  } catch {
    res.status(400).send({ message: ERR_DELETE_GAME });
  }
};

const checkEmptyFields = async (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: ERR_FILL_ALL_FIELDS }));
  } else {
    next();
  }
};

const checkIfUsersAreSafe = async (req, res, next) => {
  if (!req.body.users) {
    next();
    return;
  }
  if (req.body.users.length - 1 === req.game.users.length) {
    next();
    return;
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: ERR_USER_CHANGES,
      })
    );
  }
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
  if (!req.body.categories || req.body.categories.length === 0) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: ERR_SELECT_CATEGORY }));
  } else {
    next();
  }
};

const checkIsGameExists = async (req, res, next) => {
  const isInArray = req.gamesArray.find((game) => {
    return (
      req.body.title === game.title && game._id.toString() !== req.params.id
    );
  });

  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: ERR_GAME_EXISTS }));
  } else {
    next();
  }
};

const voteGame = async (req, res, next) => {
  try {
    req.game = await games.findById(req.params.id).populate("users");

    const { success } = await games.vote(req.game, req.user);

    if (!success) {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: ERR_VOTE_GAME }));
    }

    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: ERR_GAME_NOT_FOUND }));
  }
};

const unvoteGame = async (req, res, next) => {
  try {
    req.game = await games.findById(req.params.id).populate("users");

    const { success } = await games.unvote(req.game, req.user);

    if (!success) {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: ERR_VOTE_CANCEL }));
    }

    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: ERR_GAME_NOT_FOUND }));
  }
};

module.exports = {
  createGame,
  findAllGames,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkIsGameExists,
  voteGame,
  unvoteGame,
};
