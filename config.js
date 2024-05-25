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
};
