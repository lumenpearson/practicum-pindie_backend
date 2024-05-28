import mongoose from "mongoose";
import { DB_URL } from "../config.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Успешно подключились к MongoDB");
  } catch (error) {
    console.log(`При подключении MongoDB возникла ошибка: ${error}`);
  }
};

export default connectToDatabase;
