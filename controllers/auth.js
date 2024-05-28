import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const login = (request, response) => {
  const { email, password } = request.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "i-am-so-tired", {
        expiresIn: "7d",
      });
      return { user, token };
    })
    .then(({ user, token }) => {
      response.status(200).send({
        _id: user._id,
        username: user.username,
        email: user.email,
        jwt: token,
      });
    })
    .catch((error) => {
      response.status(401).send({ message: error.message });
    });
};

const sendIndex = (request, response) => {
  if (request.cookies.jwt) {
    try {
      jwt.verify(request.cookies.jwt, "i-am-so-tired");
      return response.redirect("/admin/dashboard");
    } catch (error) {
      return response.sendFile(path.join(__dirname, "../public/index.html"));
    }
  } else {
    return response.sendFile(path.join(__dirname, "../public/index.html"));
  }
};

const sendDashBoard = (request, response) => {
  response.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
};

export { login, sendIndex, sendDashBoard };
