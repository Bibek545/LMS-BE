import UserSchema from './UserSchema.jsx'

export const createNewUser = (userObj) => {
    return UserSchema(userObj).save();
}