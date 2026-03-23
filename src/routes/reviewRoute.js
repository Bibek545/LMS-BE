import express from "express";
// import { responseClient } from "../middleware/responseClient.js";
import { userAuthMiddleware, adminAuthMiddleware } from "../middleware/authMiddleware.js";
import { insertNewReviewController } from "../controllers/reviewController.js";
import { newReviewDataValidation } from "../middleware/validations/reviewDataValidation.js";

const router = express.Router();
// insert new Review
router.post("/", userAuthMiddleware,newReviewDataValidation, insertNewReviewController);

//return request for admin only
// router.get("/admin", userAuthMiddleware, adminAuthMiddleware, getBurrowController)

//return for the user specific borrows list 
// router.get("/user", userAuthMiddleware ,getBurrowController)

//return the book for library admin to manage the burrow request
// router.patch("/", userAuthMiddleware ,returnBookController)

export default router;
