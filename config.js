const config = require("dotenv").config().parsed;

const HOST = config.HOST || "localhost";
const PORT = config.PORT || 3001;
const CORS = config.CORS ? config.CORS.split(",") : ["localhost"];
const MONGODB_CONN = config.MONGODB_CONN || "mongodb://localhost:27017/pindie";
const SECRET_KEY = config.SECRET_KEY || "insecure_secret_key";
const JWT_EXPIRES_IN = config.JWT_EXPIRES_IN || "1d";
const LOGIN_PATH = "/admin/login";
const START_PATH = "/";
const URL = `http://${HOST}:${PORT}${START_PATH}`;

const ERR_NO_RIGHTS = "You don't have enough rights!";
const ERR_AUTH_REQUIRED = "Authorization required.";

const ERR_CAT_CREATE = "Error creating category.";
const ERR_CAT_UPDATE = "Error updating category.";
const ERR_CAT_DELETE = "Error deleting category.";
const ERR_CAT_NOT_FOUND = "Category not found.";
const ERR_CAT_NAME_REQUIRED = "Category name is required.";
const ERR_CAT_EXISTS = "Category with this name already exists.";

const ERR_CREATE_GAME = "Error creating game.";
const ERR_GAME_NOT_FOUND = "Game not found.";
const ERR_UPDATE_GAME = "Error updating game.";
const ERR_DELETE_GAME = "Error deleting game.";
const ERR_FILL_ALL_FIELDS = "Please fill in all fields.";
const ERR_USER_CHANGES = "You cannot remove users or add more than one user.";
const ERR_SELECT_CATEGORY = "Please select at least one category.";
const ERR_GAME_EXISTS = "A game with this title already exists.";
const ERR_VOTE_GAME = "Error during voting.";
const ERR_VOTE_CANCEL = "Error canceling the vote.";

const ERR_USER_CREATE = "Error creating user.";
const ERR_USER_NOT_FOUND = "User not found.";
const ERR_USER_UPDATE = "Error updating user.";
const ERR_USER_DELETE = "Error deleting user.";

const ERR_PASSWORD_HASH = "Error hashing password.";
const ERR_EMPTY_NAME_EMAIL = "Please provide a name and email.";
const ERR_INVALID_EMAIL_OR_PASS = "Incorrect email or password!";
const ERR_EMPTY_NAME_EMAIL_PASS = "Please provide a name, email, and password.";
const ERR_INVALID_NAME = "Invalid name format.";
const ERR_INVALID_EMAIL = "Invalid email format.";
const ERR_USER_EXISTS_NAME = "User with the same name already exists.";
const ERR_USER_EXISTS_EMAIL = "User with this email already exists.";

module.exports = {
  HOST,
  PORT,
  CORS,
  MONGODB_CONN,
  SECRET_KEY,
  JWT_EXPIRES_IN,
  LOGIN_PATH,
  START_PATH,
  URL,
  ERR_NO_RIGHTS,
  ERR_AUTH_REQUIRED,
  ERR_CAT_CREATE,
  ERR_CAT_UPDATE,
  ERR_CAT_DELETE,
  ERR_CAT_NOT_FOUND,
  ERR_CAT_NAME_REQUIRED,
  ERR_CAT_EXISTS,
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
  ERR_USER_CREATE,
  ERR_USER_NOT_FOUND,
  ERR_USER_UPDATE,
  ERR_USER_DELETE,
  ERR_PASSWORD_HASH,
  ERR_EMPTY_NAME_EMAIL,
  ERR_INVALID_EMAIL_OR_PASS,
  ERR_EMPTY_NAME_EMAIL_PASS,
  ERR_INVALID_NAME,
  ERR_INVALID_EMAIL,
  ERR_USER_EXISTS_NAME,
  ERR_USER_EXISTS_EMAIL,
};
