import mongoose from 'mongoose';
import SessionSchema from './SessionSchema.js';
import { updateUser } from '../user/UserModel.js';


export const createNewSession = (sessionobj)=> {
    return SessionSchema(sessionobj).save();
}

export const deleteSession=(filter) => {
 return SessionSchema.findOneAndDelete(filter);
}

export const getSession = (filter)=> {
    return SessionSchema.findOne(filter);
}