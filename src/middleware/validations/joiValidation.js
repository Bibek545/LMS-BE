import Joi from "joi"
import { responseClient } from "../responseClient.js"


export const validateData = ({req, res, next, obj}) => {
 //create schema or rules

    const schema = Joi.object(obj)

    //pass ypur data (req.body) to the schema
    const value = schema.validate(req.body)
    // console.log(value)
     

    //if pass go to the next() ot reponse the error from here


    if(value.error) {
        return responseClient({
            req,
            res,
            message: value.error.message, 
            statuscode:400,
        })
    }
    next();

}

export const newUserDataValidation = (req,res,next) => {
    //       "fName": "bibek",
//   "lName": "hamal",
//   "email": "abcd7@bec.com",
//   "password": "test",
//   "phone": "123456789"

  const obj = {
        fName: Joi.string().min(5).required(),
        lName: Joi.string().min(5).required(),
        email: Joi.string().email({minDomainSegments:2}).required(),
        password: Joi.string().required(),
        phone: Joi.number(),

    };
    return validateData({req, res, next, obj});
}

export const userActivationDataValidation = (req, res, next) => {
    //create a schema or rules

    const obj =({
        sessionId: Joi.string().min(10).max(30).required(),
        t: Joi.string().min(10).max(40).required(),
    });

validateData({req, res, next, obj})
}
