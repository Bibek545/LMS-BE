import e from "cors";
import { responseClient } from "../middleware/responseClient.js";
import {
  createBurrow,
  getBurrows,
  updateBurrow,
} from "../models/burrow/BurrowModel.js";
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
    if (burrow.length) {
      //update book table with expectedAvailable Date
      burrow.map(async ({ bookId }) => {
        await updateBook({ _id: bookId, expectedAvailable: dueDate });
      });
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

// export const returnBookController = async (req, res, next) => {
//   try {
//     const { _id } = req.userInfo;

//     //get the user id and borrow id from the request body

//     //update the borrow table
//     const filter = {
//       _id: req.body._id,
//       userId: _id,
//     };
//     const obj = {
//       isReturned: true,
//       returnedDate: Date.now(),
//     };
//     console.log("req.body:", req.body);
// console.log("userInfo:", req.userInfo);
// console.log("filter:", filter);

//     const result = await updateBurrow(filter, obj);
//     if (result?._id) {
//       //update the book table with the returned date and make the book available for other users
//       const updateBookResult = await updateBook(
//         { _id: result.bookId },
//         { expectedAvailable: null },
//       );
// console.log("result:", result);


//       if (updateBookResult?._id) {
//         //book returned successfully, now return the updated borrow list for the user
//         return responseClient({
//           req,
//           res,
//           message: "Book returned successfully",
//         });
//       }
//     }
//     responseClient({
//       req,
//       res,
//       message: "Unable to return the book, try again later",
//       statusCode: 401,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const returnBookController = async (req, res, next) => {
  try {
    const { _id, role } = req.userInfo;

    const filter =
      role === "admin"
        ? { _id: req.body._id }
        : { _id: req.body._id, userId: _id };

    const obj = {
      isReturned: true,
      returnedDate: Date.now(),
    };

    console.log("req.body:", req.body);
    console.log("userInfo:", req.userInfo);
    console.log("filter:", filter);

    const result = await updateBurrow(filter, obj);
    console.log("updateBurrow result:", result);

    if (!result?._id) {
      return responseClient({
        req,
        res,
        message: "Borrow record not found or could not be updated",
        statusCode: 401,
      });
    }

    const bookId = result?.cart?.[0]?.bookId;
    console.log("bookId from borrow:", bookId);

    if (!bookId) {
      return responseClient({
        req,
        res,
        message: "Book ID not found in borrow record",
        statusCode: 401,
      });
    }

    const updateBookResult = await updateBook(
      { _id: bookId },
      { expectedAvailable: null }
    );

    console.log("updateBookResult:", updateBookResult);

    if (!updateBookResult?._id) {
      return responseClient({
        req,
        res,
        message: "Borrow updated but book update failed",
        statusCode: 401,
      });
    }

    return responseClient({
      req,
      res,
      message: "Book returned successfully",
    });
  } catch (error) {
    next(error);
  }
};