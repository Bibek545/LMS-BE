// import { required } from "joi";
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      index: 1,
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
      type: Number,
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
      // default: false,
    },
    expectedAvailable: {
      type: Date,
      default: null,
    }, // ✅ New field

    status: {
      type: String,
      default: "inactive", // active or inactive
    },

    description: {
      type: String,
      required: true,
    },

    averageRating: {
      type: Number, // average of all ratings
    },
    addedBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
      },
    },
    lastUpdatedBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
      },
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("book", bookSchema);
