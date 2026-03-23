import e from "cors";
import { responseClient } from "../middleware/responseClient.js";
import { createReview } from "../models/review/ReviewModel.js";

export const insertNewReviewController = async (req, res, next) => {
  try {
    const { _id, fName, lName } = req.userInfo;
    const reviewObj = {
      userId: _id,
      userName: `${fName}${lName}`,
      ...req.body,
      //bookId,
      // title,
      // reviewMessage,
      // rating,
      // borrowId,
    };
    
    const review = await createReview(reviewObj);
    review._id
      ? responseClient({
          req,
          res,
          message: "The review has been recived successfully",
        })
      : responseClient({
          req,
          res,
          message:
            "Unable to recevie your review, try again later",
          statusCode: 401,
        });
  } catch (error) {
    console.error(" insertNewReview error:", error.message);
    next(error);
  }
};
