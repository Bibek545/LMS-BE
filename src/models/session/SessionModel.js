import mongoose from 'mongoose';
import SessionSchema from './SessionSchema.js';
import { updateUser } from '../user/UserModel.js';
export const createNewSession = (sessionobj)=> {
    return SessionSchema(sessionobj).save();
}

export const deleteSession=(filter) => {

  // const updatedFilter = {...filter};

  // if(updatedFilter._id && typeof updatedFilter._id === "string") {
  //   if(mongoose.Types.ObjectId.isValid(updatedFilter._id)) {
  //     updatedFilter._id = new mongoose.Types.ObjectId(updatedFilter._id);

  //   } else {
  //     throw new Error("Invalid session ID");
  //   }
  // }
  return SessionSchema.findOneAndDelete(filter);
}