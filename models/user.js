import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxLength: 255,
    minLength: 1,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    maxLength: 255,
    minLength: 5,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    maxLength: 255,
    minLength: 1,
    trim: true,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Incorrect email or password"));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return user;
    });
  });
};

export default mongoose.model("user", userSchema);
