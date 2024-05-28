import user from "../models/user.js";
import bcrypt from "bcryptjs";
import { request } from "express";

const findAllUsers = async (request, response, next) => {
  request.usersArray = await user.find({}, { password: 0 });
  next();
};

const createUser = async (request, response, next) => {
  try {
    request.user = await user.create(request.body);
    next();
  } catch (error) {
    response.status(400).send("Error creating user");
  }
};

const findUserById = async (request, response, next) => {
  try {
    request.user = await user.findById(request.params.id, { password: 0 });
    next();
  } catch (error) {
    response.status(404).send({ message: "User not found" });
  }
};

const deleteUser = async (request, response, next) => {
  try {
    request.user = await user.findByIdAndDelete(request.params.id);
    next();
  } catch (error) {
    response.status(400).send("Error deleting category");
  }
  next();
};

const updateUser = async (request, response, next) => {
  try {
    request.user = await user.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    next();
  } catch (error) {
    response.status(400).send({ message: "Error update user" });
  }
};

const checkEmptyName = async (request, response, next) => {
  if (!request.body.name) {
    response.status(400).send({ message: "Enter the name of the name" });
  } else {
    next();
  }
};

const checkEmptyPassword = async (request, response, next) => {
  if (!request.body.password) {
    response.status(400).send({ message: "Enter the name of the password" });
  } else {
    next();
  }
};

const checkEmptyNameAndEmail = async (request, response, next) => {
  if (!request.body.username || !request.body.email) {
    response.status(400).send({ message: "Enter your name and email" });
  } else {
    next();
  }
};

const checkIsUserExists = async (request, response, next) => {
  const isInArray = request.usersArray.find((user) => {
    return request.body.email === user.email;
  });
  if (isInArray) {
    response
      .status(400)
      .send({ message: "A user with this email address already exists" });
  } else {
    next();
  }
};

const conversionToHash = async (require, response, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    require.body.password = await bcrypt.hash(require.body.password, salt);
    next();
  } catch (error) {
    response.status(400).send({ message: "Password hashing execution error" });
  }
};

export {
  findAllUsers,
  createUser,
  findUserById,
  deleteUser,
  updateUser,
  checkEmptyName,
  checkEmptyNameAndEmail,
  checkIsUserExists,
  conversionToHash,
  checkEmptyPassword,
};
