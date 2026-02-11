// import { ref } from "joi"; 
import mongoose from "mongoose";

const burrowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: [
      {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    bookTitle: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
        reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      default: null,
    },
      }
    ],
    isReturned: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnedDate: {
      type: Date,
      required: null,
    },


  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Burrow", burrowSchema); //USERS
// export default burrowSchema;
