import { responseClient } from "../middleware/responseClient.js";
import { createNewBook, getAllBooks, getAllPublicBooks } from "../models/books/BookModel.js";
import slugify from "slugify";
export const insertNewBook = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    const obj = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true}),


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
    if(error.messsage.includes("E11000 duplicates key")) {
      return responseClient({req,
        res,
        message: "Duplicate data not allowed: " + JSON.stringify(error.keyValue),
        statusCode: 400,
      });
    }
    next(error);
  }
};

export const getAllBooksController = async (req, res, next) => {
  try {
   const payload = await getAllBooks()
   responseClient({
    req, res, payload, message: 'Theses are the all books'
   })

  } catch (error) {
    next(error);
  }
};

export const getAllPublicBooksController = async (req, res, next) => {
  try {
   const payload = await getAllPublicBooks()
   responseClient({
    req, res, payload, message: 'Theses are all the public books'
   })

  } catch (error) {
    next(error);
  }
}