const sendAllUsers = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.usersArray));
};

const sendUserCreated = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(request.user));
};

const sendUserDeleted = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(request.user));
};

const sendUserById = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(request.user));
};

const sendUserUpdated = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ message: "User Update" }));
};

const sendMe = (request, response) => {
  response.setHeader("Content-type", "application/json");
  response.end(JSON.stringify(request.user));
};

export {
  sendAllUsers,
  sendUserCreated,
  sendUserDeleted,
  sendUserById,
  sendUserUpdated,
  sendMe,
};
