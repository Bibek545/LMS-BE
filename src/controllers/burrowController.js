import e from "cors";
import { responseClient } from "../middleware/responseClient.js";
import { createBurrow, getBurrows } from "../models/burrow/BurrowModel.js";
import { updateBook } from "../models/books/BookModel.js";

const BOOK_DUE_DAYS = 15;
export const insertNewBurrow = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;

    let today = new Date();
    const dueDate = today.setDate(today.getDate() + BOOK_DUE_DAYS);

    // const obj = {
    //   cart: req.body,
    //   userId: _id,
    //   dueDate,
    // };
    // console.log(obj);
    // req.body = req.body.map((book) => {
    //   return {
    //     ...book,
    //     userId: _id,
    //     dueDate,
    //   };
    // });
    // console.log("Incoming cart:", req.body);
    // console.log("Saved cart:", cart);
const cart = req.body.map((book) => ({
  bookId: book.bookId,
  bookTitle: book.bookTitle,
  thumbnail: book.thumbnail,
  bookSlug: book.bookSlug,
  reviewId: null,
}));

    const obj = {
      userId: _id,
      dueDate: today,
      cart,
    };
    console.log("Incoming cart:", req.body);
    console.log("Saved cart:", cart);

    const burrow = await createBurrow([obj]);

    // const burrow = await createBurrow(req.body);
   if(burrow.length) {
    //update book table with expectedAvailable Date
    burrow.map(async ({bookId})=> {
      await updateBook({_id: bookId, expectedAvailable: dueDate})
    })
   }

    burrow.length
      ? responseClient({
          req,
          res,
          message: "The burrow has been added successfully",
          payload: burrow,
        })
      : responseClient({
          req,
          res,
          message:
            "Unable to insert new burrow in the database, try again later",
          statusCode: 401,
        });
  } catch (error) {
    console.error(" insertNewBurrow error:", error.message);
    next(error);
  }
};

export const getBurrowController = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const path = req.path;

    const isAdmin = path === "/admin";

    // console.log(req.body)
    const burrow = isAdmin
      ? await getBurrows()
      : await getBurrows({ userId: _id });

    responseClient({
      req,
      res,
      message: "Here is the list of burrow",
      payload: burrow,
    });
  } catch (error) {
    // console.error(" insertNewBurrow error:", error.message);
    next(error);
  }
};
