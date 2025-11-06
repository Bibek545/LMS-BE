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
import path from "path";

const router = express.Router();

//multer setup
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file)
    const filePath =
      file.originalname +
      "-" +
      uniqueSuffix +
      "." +
      file.mimetype.split("/")[1];
    cb(null, filePath);
  },
});


//filter to allow images only
const fileFilter = (req, file, cb)=> {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp/
  const extName = path.extname(file.originalname).toLowerCase();
  const isAllowedExt = allowedFileTypes.test(extName);
  const mimetype = allowedFileTypes.test(file.mimetype);

  if(isAllowedExt && mimetype) {
    cb(null, true); 
  } else {
    cb(new Error("Only jpeg|jpg|png|gif|webp these images are allowed"),false);

  }
 }

const upload = multer({ storage: storage, fileFilter});
// const upload = multer ({ dest: "uploads/"});

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
  // upload.single("image"),
  upload.array("image",2),
  (req, res, next) => {
    console.log("✅ Files received:", req.files?.length);
    console.log("✅ Body:", req.body);
    next();
  },
  newBookDataValidation,
 (req, res, next) => {
    console.log("✅ Validation passed");
    next();
  },
  insertNewBook
);

//updating a new book
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
