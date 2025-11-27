//connect your database
//model

import { dbConnect } from "../../config/db.js";
import { createManyBooks, emptyBooks } from "../../models/books/BookModel.js";
import { bookData } from "./book-seeds.js";

const importData = async () => {
  try {
    await dbConnect();
    await emptyBooks();
    await createManyBooks(bookData);
    console.log("all the books have been added")
  } catch (error) {
    console.log(error);
  }
};

importData();
