import hashPassword from "../utils/bcrypt.js";
import { createNewUser, updateUser } from "../models/user/UserModel.js";
import { responseClient } from "../middleware/responseClient.js";
import {
  createNewSession,
  deleteSession,
} from "../models/session/SessionModel.js";
import { v4 as uuidv4 } from "uuid";
import { userActivationEmail, userAccountVerfiedNotification } from "../services/emailService.js";
import { Error } from "mongoose";
import SessionSchema from "../models/session/SessionSchema.js";

const insertNewUserController = async (req, res, next) => {
  try {
    //to do sign up process
    // receive the user data

    // encrypt the password
    const { password } = req.body;
    req.body.password = await hashPassword(password);

    // insert the user into the database

    const user = await createNewUser(req.body);

    if (user?._id) {
      const session = await createNewSession({
        token: uuidv4(),
        association: user.email,
      });

      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`;

        //send this url to their email
        console.log(url);
        const emailId = await userActivationEmail({
          email: user.email,
          url,
          name: user.fName,
        });

        console.log(url);
      }
      //create an unique user activation link anfd send it to their email

      //        res.json({
      //   status: "success",
      //   message: "todo",
      // });
      const message =
        "we have sent you an email with activation link. Please check your email and follow the instruction to activate your account.";
      return responseClient({ req, res, message });
    }

    // have to do all of them before the response.json starts
    throw new Error("Unable to create an account, try again later.");
  } catch (error) {
    console.log("Error in register --->", error);
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "The email already exits, try different email";
      error.statusCode = 400;
    }
    next(error);
  }
};
export default insertNewUserController;

export const activateUser = async (req, res, next) => {
  try {
    const { sessionId, t } = req.body;
    console.log(sessionId, t);

    const session = await deleteSession({
      _id: sessionId,
      token: t,
    });
    console.log(session)

    if (session?._id) {
      //updated user to active
      const user = await updateUser(
        { email: session.association },
        { status: "active" }
      );

      if (user?._id) {
        //send email notification

        userAccountVerfiedNotification({email: user.email, name: user.fName});

        const message = "Your account has been verified, you can log in";
        return responseClient({ req, res, message });
      }
    }
    const message = "Invalid token or token expired";
    const statusCode = 400;
    return responseClient({ req, res, message });
  } catch (error) {
    next(error);
  }
};
