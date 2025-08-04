import { required } from "joi";
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },

    publishedYear: {
      type: Number,
      required: true,
    },

    availability: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      default: "inactive", // active or inactive
    },

    averageRating: {
      type: Number, // average of all ratings
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("book", bookSchema);
