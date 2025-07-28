import Joi from "joi"

export const FNAME = Joi.string().min(5)
export const FNAMEREQ = FNAME.required()

export const LNAME = Joi.string().min(5)
export const LNAMEREQ = LNAME.required()

export const EMAIL = Joi.string().email({minDomainSegments:2})
export const EMAILREQ = EMAIL.required()

export const PASSWORD = Joi.string()
export const PASSWORDREQ = PASSWORD.required()


export const PHONE = Joi.number()
export const PHONEREQ = Joi.number().required()

export const SESSION = Joi.string().min(10).max(30)
export const SESSIONREQ = SESSION.required()

export const TOKEN = Joi.string().min(10).max(40)
export const TOKENREQ = TOKEN.required()


