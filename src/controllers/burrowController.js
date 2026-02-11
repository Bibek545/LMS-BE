import { responseClient } from "../middleware/responseClient.js";
import { createBurrow } from "../models/burrow/BurrowModel.js";

const BOOK_DUE_DAYS = 15;
export const insertNewBurrow = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;

    let today = new Date();
    const dueDate = today.setDate(today.getDate() + BOOK_DUE_DAYS);
    const obj = {
      cart: req.body,
      userId: _id,
      dueDate,
    };
    // console.log(obj);
    req.body = req.body.map((book)=> {
      return {
        ...book,
        userId: _id,
        dueDate,
      };
    });
    // console.log(req.body)
    const burrow = await createBurrow(req.body);
    burrow.length
      ? responseClient({
          req,
          res,
          message: "The burrow has been added successfully",
          burrow
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