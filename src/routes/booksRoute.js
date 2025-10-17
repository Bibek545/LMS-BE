import express from "express";
import {
  deleteBookController,
  getAllBooksController,
  getAllPublicBooksController,
  insertNewBook,
  updateBookController,
} from "../controllers/bookController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middleware/authMiddleware.js";
import {
  newBookDataValidation,
  updatedBookDataValidation,
} from "../middleware/validations/bookDataValidation.js";

const router = express.Router();

//multer setup
import multer from "multer";

const upload = multer ({ dest: "uploads/"});

//end multer setup


//public api
router.get("/", getAllPublicBooksController);

//for admin api
router.get(
  "/admin",
  userAuthMiddleware,
  adminAuthMiddleware,
  getAllBooksController
);

// router.get("/", (req, res, next)=> {
//     res.json({message: "TODO ADD BOOKS"});
// })
//create a new book
router.post(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  upload.single("image"),
  newBookDataValidation,
  
  insertNewBook
);

//iupdating a new book
router.put(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  updatedBookDataValidation,
  updateBookController
);

//de;eteing the book
router.delete(
  "/:_id",
  userAuthMiddleware,
  adminAuthMiddleware,
  deleteBookController
);

export default router;
