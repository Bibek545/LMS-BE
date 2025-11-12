import Joi from "joi";
import { responseClient } from "../responseClient.js";
import { deleteUploadedFiles } from "../../utils/fileUtil.js";

export const validateData = ({ req, res, next, obj }) => {
  try {
    //create schema or rules

    const schema = Joi.object(obj);

    //pass ypur data (req.body) to the schema
    const { error, value } = schema.validate(req.body, {
      convert: true, // ✅ Converts strings ("2020") → numbers, ("true") → booleans
      abortEarly: false, // ✅ Reports all errors instead of stopping at the first
      stripUnknown: true, // ✅ Removes unexpected fields (optional, but helpful)
    });
    // console.log(value)

    //if pass go to the next() ot reponse the error from here

    // if(value.error) {
    //     return responseClient({
    //         req,
    //         res,
    //         message: value.error.message,
    //         statuscode:400,
    //     })
    // }
    // next();
    // If validation fails, send response
    if (error) {
      console.log(req.file, req.files);
      if(req.file || Array.isArray(req.files)) {
        deleteUploadedFiles(req);
      }
      return responseClient({
        req,
        res,
        message: error.details.map((d) => d.message).join(", "),
        statuscode: 400,
      });
    }

    // Attach the sanitized + converted values back to req.body
    req.body = value;

    // Continue to the next middleware
    next();
  } catch (err) {
    console.error("Validation exception:", err.message);
    return responseClient({
      req,
      res,
      message: "Validation error: " + err.message,
      statuscode: 500,
    });
  }
};
