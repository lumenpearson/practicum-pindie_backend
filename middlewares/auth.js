const jwt = require("jsonwebtoken");
const users = require("../models/user");
const { SECRET_KEY, ERR_NO_RIGHTS, ERR_AUTH_REQUIRED } = require("@/config");

const Authorize = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.replace("Bearer ", ERR_NO_RIGHTS);
  } else {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(401).send({ message: ERR_NO_RIGHTS });
  }

  try {
    req.token = await jwt.verify(token, SECRET_KEY);
    req.user = await users.findById(req.token._id, { password: 0 });

    if (!req.user) {
      return res.status(401).send({ message: ERR_NO_RIGHTS });
    }
  } catch {
    return res.status(401).send({ message: ERR_NO_RIGHTS });
  }
  next();
};

const checkAdmin = async (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    res.status(403).send({ message: ERR_AUTH_REQUIRED });
  }
};

module.exports = { Authorize, checkAdmin };
