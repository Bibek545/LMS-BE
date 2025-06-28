import { required, types } from 'joi';
import mongoose from 'mongoose';
import Mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fName: {
        types: String,
        required: true
    },
      lName: {
        types: String,
        required: true
    },
      role: {
        types: String,
        required: true,
        default: 'user'
    },
      email: {
        types: String,
        required: true,
        unique: true,
        index: 1
    },
      phone: {
        types: String,
       
    },
      passsword: {
        types: String,
        required: true
    },
      refreshJWT: {
        types: String,
    },
}, {
    timestamps: true

});

export default mongoose.model;("User", UserSchema); //USERS
