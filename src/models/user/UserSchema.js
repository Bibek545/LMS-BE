
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
      lName: {
        type: String,
        required: true
    },
      role: {
        type: String,
        required: true,
        default: 'user'
    },
      email: {
        type: String,
        required: true,
        unique: true,
        index: 1
    },
      phone: {
        type: String,
       
    },
      password: {
        type: String,
        required: true
    },
      refreshJWT: {
        type: String,
    },
}, {
    timestamps: true

});

export default mongoose.model("User", UserSchema); //USERS
