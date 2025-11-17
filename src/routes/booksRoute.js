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
    console.log(file);
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
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
  const extName = path.extname(file.originalname).toLowerCase();
  const isAllowedExt = allowedFileTypes.test(extName);
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (isAllowedExt && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg|jpg|png|gif|webp these images are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 1024 * 2 * 1024 },
});



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
  upload.array("images", 2),
  newBookDataValidation,
  insertNewBook
);

//updating a new book
router.put(
  "/",
  userAuthMiddleware,
  adminAuthMiddleware,
  // upload.single("image"),
  upload.array("images", 2),
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

// 🔥 Multer error handler (logs clear "Unexpected field" etc.)
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("❌ Multer error:", err.message);
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  } else if (err) {
    console.error("❌ Upload/general error:", err.message);
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
  next();
});