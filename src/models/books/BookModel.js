import BookSchema from "./BookSchema.js";
import mongoose from "mongoose";

//insert new book
export const createNewBook = (bookObj)=> {
    return BookSchema(bookObj).save();
};