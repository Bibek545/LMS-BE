import UserSchema from './UserSchema.js'
//create user
export const createNewUser = (userObj) => {
    return UserSchema(userObj).save();
}
//update user
export const updateUser = (filter, update)=> {
   return UserSchema.findOneAndUpdate(filter, update, { new: true}) ;
} 

//get user by email

export const getUserByEmail = (email) => {
    return UserSchema.findOne({email});
}