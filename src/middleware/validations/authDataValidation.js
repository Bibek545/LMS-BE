import { EMAILREQ, FNAMEREQ, LNAMEREQ, PASSWORD, PHONE, SESSIONREQ, TOKENREQ } from "./joiConst.js";
import { validateData } from "./joiValidation.js";

export const newUserDataValidation = (req,res,next) => {
    //       "fName": "bibek",
//   "lName": "hamal",
//   "email": "abcd7@bec.com",
//   "password": "test",
//   "phone": "123456789"

  const obj = {
        fName: FNAMEREQ,
        lName: LNAMEREQ,
        email: EMAILREQ,
        password: PASSWORD,
        phone: PHONE,

    };
 validateData({req, res, next, obj});
}

export const userActivationDataValidation = (req, res, next) => {
    //create a schema or rules

    const obj =({
        sessionId: SESSIONREQ,
        t: TOKENREQ,
    });

validateData({req, res, next, obj})
}
