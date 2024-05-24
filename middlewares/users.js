const bcrypt = require("bcryptjs");
const users = require("../models/user");
const {
  ERR_USER_CREATE,
  ERR_USER_NOT_FOUND,
  ERR_USER_UPDATE,
  ERR_USER_DELETE,
  ERR_PASSWORD_HASH,
  ERR_EMPTY_NAME_EMAIL_PASS,
  ERR_EMPTY_NAME_EMAIL,
  ERR_INVALID_NAME,
  ERR_INVALID_EMAIL,
  ERR_USER_EXISTS_NAME,
  ERR_USER_EXISTS_EMAIL,
} = require("@/config");

const createUser = async (req, res, next) => {
  try {
    req.user = await users.create(req.body);
    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: ERR_USER_CREATE }));
  }
};

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({}, { password: 0 });
  
  next();
};

const findUserById = async (req, res, next) => {
  try {
    req.user = await users.findById(req.params.id, { password: 0 });
    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: ERR_USER_NOT_FOUND }));
  }
};

const updateUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res
      .status(400)
      .send({ message: `${ERR_USER_UPDATE}\n${error}` });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: ERR_USER_DELETE }));
  }
};

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    next();
  } catch {
    res.status(400).send({ message: ERR_PASSWORD_HASH });
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: ERR_EMPTY_NAME_EMAIL_PASS }));
  } else {
    next();
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.username || !req.body.email) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: ERR_EMPTY_NAME_EMAIL }));
  } else {
    next();
  }
};

const validateUsername = async (req, res, next) => {
  const pattern = /^[0-9A-Za-z]{3,32}$/;
  if (!pattern.test(req.body.username)) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: ERR_INVALID_NAME }));
  } else {
    next();
  }
};

const validateEmail = async (req, res, next) => {
  const pattern = /^\S+@\S+\.\S+$/;
  if (!pattern.test(req.body.email)) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: ERR_INVALID_EMAIL }));
  } else {
    next();
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isUsernameInArray = req.usersArray.find((user) => {
    return (
      req.body.username === user.username &&
      user._id.toString() !== req.params.id
    );
  });
  
  const isEmailInArray = req.usersArray.find((user) => {
    return (
      req.body.email === user.email && user._id.toString() !== req.params.id
    );
  });
  
  if (isUsernameInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: ERR_USER_EXISTS_NAME,
      }),
    );
  } else if (isEmailInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: ERR_USER_EXISTS_EMAIL,
      }),
    );
  } else {
    next();
  }
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  hashPassword,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  validateUsername,
  validateEmail,
  checkIsUserExists,
};
