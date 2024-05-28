import mongoose from "mongoose";
import user from "./user.js";
import category from "./category.js";

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxLength: 255,
    minLength: 1,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    maxLength: 255,
    minLength: 1,
    required: true,
  },
  developer: {
    type: String,
    trim: true,
    maxLength: 255,
    minLength: 1,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    maxLength: 255,
    minLength: 1,
    required: true,
  },
  link: {
    type: String,
    trim: true,
    maxLength: 255,
    minLength: 1,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: category,
    },
  ],
});

gameSchema.statics.findGameByCategory = function (category) {
  return this.find({})
    .populate({
      path: "categories",
      match: { name: category },
    })
    .populate({
      path: "users",
      select: "-password",
    })
    .then((games) => {
      return games.filter((game) => game.categories.length > 0);
    });
};

export default mongoose.model("game", gameSchema);
