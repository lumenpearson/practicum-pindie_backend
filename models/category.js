import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 255,
    required: true,
  },
});

export default mongoose.model("category", categorySchema);
