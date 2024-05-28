const sendAllGames = (request, response, next) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(request.gamesArray));
  next();
};

const sendGameCreated = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(request.game));
};

const sendGameDeleted = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(request.game));
};

const sendGameById = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(request.game));
};

const sendGameUpdated = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ message: "Game Update" }));
};

export {
  sendAllGames,
  sendGameCreated,
  sendGameDeleted,
  sendGameById,
  sendGameUpdated,
};
