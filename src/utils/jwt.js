import jwt from 'jsonwebtoken';
import { createNewSession } from '../models/session/SessionModel.js';
import { updateUser } from '../models/user/UserModel.js';

//generate the accessJwt

export const createAccessJWT = async (email) => {
//create
const token = jwt.sign({email}, process.env.ACCESSJWT_SECRET, {expiresIn: "15m"});
//store
const obj = {
    token,
    association: email,
    expire: new Date(Date.now() + 900000)
};

const newSession = await createNewSession(obj)
return newSession?._id? token : null;
};
//decode accesJwt

//generate refreshJwt

export const createRefreshJWT = async (email) => {
    //create
    const refreshToken = jwt.sign({email}, process.env.REFRESHJWT_SECRET,{expiresIn: "30d"});
    console.log(refreshToken);
    //store
const user = await updateUser({email}, {refreshJWT: refreshToken});
console.log(user)
return user?._id ? refreshToken: null;
};

//decode refreshJwt


export const getJwts = async (email)=> {
    return {
        accessJWT: await createAccessJWT(email),
        refreshJWT: await createRefreshJWT(email),
    }
}