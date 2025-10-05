import BookSchema from "./BookSchema.js";
import mongoose from "mongoose";

//insert new book
export const createNewBook = (bookObj)=> {
    return BookSchema(bookObj).save();
};
 
//get all book for admin
export const getAllBooks=() => {
    return BookSchema.find();
}

//get all books for public
export const getAllPublicBooks=() => {
    return BookSchema.find({ status : "active"});
}