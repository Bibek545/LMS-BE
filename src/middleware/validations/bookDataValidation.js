
import { ISBN_REQ, LONG_STR_REQ, PUBLISHED_YEAR_REQ, SHORT_STR_REQ,  } from "./joiConst.js"
import { validateData } from "./joiValidation.js";

export const newBookDataValidation = (req, res, next) => {
     const obj = {

//           "title":"The Flashpoint Paradox",
//   "publishedYear":2011,
//   "author":"Geoff Johns",
//   "thumbnail":"thumbnail",
//   "isbn":"12345678",
//   "genre": "comics",
//   "availability": true,
//   "status": "active",
//   "averageRating": 9.9,
//   "description": "this is the book description"
        title: SHORT_STR_REQ,
        publishedYear: PUBLISHED_YEAR_REQ,
        author: SHORT_STR_REQ,
        thumbnail: LONG_STR_REQ,
        isbn: ISBN_REQ,
        genre: SHORT_STR_REQ,
        description: LONG_STR_REQ
     };
     validateData({req, res, next, obj});
};