import hashPassword from "../utils/bcrypt.js";
import { createNewUser } from "../models/user/UserModel.js";

const insertNewUserController = async (req, res, next) => {
  try {
    //to do sign up process
    // receive the user data

    // encrypt the password
    const { password } = req.body;
    req.body.password = hashPassword(password);

    // insert the user into the database

    const user = await createNewUser(req.body);


    if(user?._id) {


          //create an unique user activation link anfd send it to their email

           res.json({
      status: "success",
      message: "todo",
    });
 
      
    }
  


    // have to do all of them before the response.json starts
    res.json({
      status: "error",
      message: "unable to create an account, try again later",
    });
  } catch (error) {
    if(error.message.includes("E11000 duplicate key error collection")) {
        error.message = "The email already exits, try different email";
        error.statusCode = 200;
    }
    next(error);
  }
};

export default insertNewUserController;
