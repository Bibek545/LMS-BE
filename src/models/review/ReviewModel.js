import mongoose from "mongoose";
import ReviewSchema from "./ReviewSchema.js";

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);


export const createReview = (reviewObj) => {
  return ReviewSchema(reviewObj).save();
};

export const getReviews = (filter) => {
  return ReviewSchema.find(filter);
};

export const updateReview = (filter, obj) => {
  return ReviewSchema.findOneAndUpdate(filter, obj, { new: true });
};

export const deleteReview = (filter) => {
  return ReviewSchema.findOneAndDelete(filter)
}
export default Review;
