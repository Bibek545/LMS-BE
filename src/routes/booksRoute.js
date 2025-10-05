import express from 'express';
import { getAllBooksController, getAllPublicBooksController, insertNewBook } from '../controllers/bookController.js';
import { adminAuthMiddleware, userAuthMiddleware } from '../middleware/authMiddleware.js';
import { newBookDataValidation } from '../middleware/validations/bookDataValidation.js';

const router = express.Router()

//public api
router.get("/", getAllPublicBooksController);

//for admin api
router.get("/admin", userAuthMiddleware,adminAuthMiddleware, getAllBooksController);


// router.get("/", (req, res, next)=> {
//     res.json({message: "TODO ADD BOOKS"});
// })
//create a new book
router.post("/", userAuthMiddleware, adminAuthMiddleware,newBookDataValidation, insertNewBook);

export default router;
