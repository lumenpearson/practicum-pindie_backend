const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ERR_INVALID_EMAIL_OR_PASS } = require("../config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error(ERR_INVALID_EMAIL_OR_PASS));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error(ERR_INVALID_EMAIL_OR_PASS));
      }

      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
