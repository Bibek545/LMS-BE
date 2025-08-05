import { responseClient } from "../middleware/responseClient.js";
import { createNewBook } from "../models/books/BookModel.js";

export const insertNewBook = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    const obj = {
      ...req.body,

      addedBy: { name: fName, adminId: _id },
      lastUpdatedBy: { name: fName, adminId: _id },
    };
    // console.log(obj);

    const book = await createNewBook(obj);
    book._id
      ? responseClient({
          req,
          res,
          message: "The book has been added successfully",
        })
      : responseClient({
          req,
          res,
          message: "Unable to insert new book in the database, try again later",
          statusCode: 401,
        });
  } catch (error) {
    next(error);
  }
};
