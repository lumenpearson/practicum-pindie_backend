import game from "../models/game.js";

const findAllGames = async (request, response, next) => {
  if (request.query["categories.name"]) {
    request.gamesArray = await game.findGameByCategory(
      request.query["categories.name"]
    );
    next();
    return;
  }
  request.gamesArray = await game.find({}).populate("categories").populate({
    path: "users",
    select: "-password",
  });
  next();
};

const createGame = async (request, response, next) => {
  try {
    request.game = await game.create(request.body);
    next();
  } catch (error) {
    response.status(400).send("Error creating game");
  }
  next();
};

const findGameById = async (request, response, next) => {
  try {
    request.game = await game.findById(request.params.id);
    next();
  } catch (error) {
    response.status(404).send({ message: "Game not found" });
  }
};

const deleteGame = async (request, response, next) => {
  try {
    request.game = await game.findByIdAndDelete(request.params.id);
    next();
  } catch (error) {
    response.status(400).send("Error deleting game");
  }
  next();
};

const updateGame = async (request, response, next) => {
  try {
    request.game = await game.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    next();
  } catch (error) {
    response.status(400).send({ message: "Error update game" });
  }
};

const checkEmptyFields = async (request, response, next) => {
  if (request.isVoteRequest) {
    next();
    return;
  }
  if (
    !request.body.title ||
    !request.body.description ||
    !request.body.image ||
    !request.body.link ||
    !request.body.developer
  ) {
    response.status(400).send({ message: "Fill all blank" });
  } else {
    next();
  }
};

const checkIfCategoriesAvaliable = async (request, response, next) => {
  if (request.isVoteRequest) {
    next();
    return;
  }
  if (!request.body.categories || request.body.categories.length === 0) {
    response.headers = { "Content-Type": "application/json" };
    response.status(400).send({ message: "Pick at least one category" });
  } else {
    next();
  }
};

const checkIfUsersAreSafe = async (request, response, next) => {
  if (!request.body.users) {
    next();
    return;
  }
  if (request.body.users.length - 1 === request.game.users.length) {
    next();
    return;
  } else {
    response
      .status(400)
      .send("You cannot delete users or add more than one user");
  }
};

const checkIsGameExists = async (request, response, next) => {
  const isInArray = request.gamesArray.find((game) => {
    return request.body.title === game.title;
  });
  if (isInArray) {
    response
      .status(400)
      .send({ message: "A game with that name already exists" });
  } else {
    next();
  }
};

const checkIsVoteRequest = async (request, response, next) => {
  if (Object.keys(request.body).length === 1 && request.body.users) {
    request.isVoteRequest = true;
  }
  next();
};

export {
  findAllGames,
  createGame,
  findGameById,
  deleteGame,
  updateGame,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIfUsersAreSafe,
  checkIsGameExists,
  checkIsVoteRequest,
};
