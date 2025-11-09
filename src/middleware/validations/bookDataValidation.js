
import { _ID_REQ, AVERAGE_RATING_REQ, EXPECTEDAVAILABLE_REQ, IS_ACTIVE_REQ, ISBN_REQ, LONG_STR_REQ, PUBLISHED_YEAR_REQ, SHORT_STR_REQ, STATUS_REQ,  } from "./joiConst.js"
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
     //    thumbnail: LONG_STR_REQ, d
        isbn: ISBN_REQ,
        genre: SHORT_STR_REQ, 
        description: LONG_STR_REQ,
        availability: IS_ACTIVE_REQ,
     //    status:STATUS_REQ,
     //    averageRating: AVERAGE_RATING_REQ,

     };
     validateData({req, res, next, obj});
};

export const updatedBookDataValidation = (req, res, next) => {
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
        status:STATUS_REQ,
        _id: _ID_REQ,
        title: SHORT_STR_REQ,
        publishedYear: PUBLISHED_YEAR_REQ,
        author: SHORT_STR_REQ,
        thumbnail: LONG_STR_REQ,
     //    isbn: ISBN_REQ,
        genre: SHORT_STR_REQ,
        description: LONG_STR_REQ,
        availability: IS_ACTIVE_REQ,
        expectedAvailable:EXPECTEDAVAILABLE_REQ
     //    status:STATUS_REQ,
     //    averageRating: AVERAGE_RATING_REQ,

     };
     validateData({req, res, next, obj});
};