import Joi from "joi";
import {
  _ID_REQ,
  AVERAGE_RATING_REQ,
  EXPECTEDAVAILABLE,
  EXPECTEDAVAILABLE_REQ,
  IS_ACTIVE,
  IS_ACTIVE_REQ,
  ISBN_REQ,
  LONG_STR,
  LONG_STR_REQ,
  PUBLISHED_YEAR,
  PUBLISHED_YEAR_REQ,
  SHORT_STR,
  SHORT_STR_REQ,
  STATUS,
  STATUS_REQ,
  STR_ARRAY,
} from "./joiConst.js";
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
  validateData({ req, res, next, obj });
};

export const updatedBookDataValidation = (req, res, next) => {
  req.body.expectedAvailable =
    req.body.expectedAvailable === " null" ? null : req.body.expectedAvailable;
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
    status: STATUS,
    _id: _ID_REQ,
    title: SHORT_STR,
    publishedYear: PUBLISHED_YEAR,
    author: SHORT_STR,
    thumbnail: LONG_STR,
    //    isbn: ISBN_REQ,
    genre: SHORT_STR,
    description: LONG_STR,
    availability: IS_ACTIVE,
    expectedAvailable: EXPECTEDAVAILABLE,
    //   imageList: LONG_STR_REQ.allow(""),
    //   imgToDelete: STR_ARRAY,
    imageList: Joi.alternatives().try(
      Joi.string(),
      Joi.array().items(Joi.string()),
      Joi.allow(null),
      Joi.allow("")
    ),

    imgToDelete: Joi.alternatives().try(
      Joi.array().items(Joi.string()),
      Joi.string(),
      Joi.allow(null),
      Joi.allow("")
    ),
    //    status:STATUS_REQ,
    //    averageRating: AVERAGE_RATING_REQ,
  };
  validateData({ req, res, next, obj });
};
