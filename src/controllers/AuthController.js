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
    //create an unique user activation link anfd send it to their email

    // have to do all of them before the response.json starts
    res.json({
      status: "success",
      message: "todo",
    });
  } catch (error) {
    next(error);
  }
};

export default insertNewUserController;
