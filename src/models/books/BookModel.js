import BookSchema from "./BookSchema.js";
import mongoose from "mongoose";

//insert new book
export const createNewBook = (bookObj)=> {
    return BookSchema(bookObj).save();
};

//update the book
export const updateBook = ({_id, ...rest})=> {
    return BookSchema.findByIdAndUpdate(_id, rest);
};

//del;ete the book
//update the book
export const deleteBook = (_id)=> {
    return BookSchema.findByIdAndDelete(_id);
};
 
 
//get all book for admin
export const getAllBooks=() => {
    return BookSchema.find();
}

//get all books for public
export const getAllPublicBooks=() => {
    return BookSchema.find({ status : "active"});
}