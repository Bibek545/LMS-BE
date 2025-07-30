import hashPassword, { comparePassword } from "../utils/bcrypt.js";
import {
  createNewUser,
  getUserByEmail,
  updateUser,
} from "../models/user/UserModel.js";
import { responseClient } from "../middleware/responseClient.js";
import {
  createNewSession,
  deleteMultipleSession,
  deleteSession,
  getSession,
} from "../models/session/SessionModel.js";
import { v4 as uuidv4 } from "uuid";
import {
  userActivationEmail,
  userAccountVerfiedNotification,
  passwordResetOTPSendEmail,
  userProfileUpdateNotificationEmail,
} from "../services/emailService.js";
import { Error } from "mongoose";
import SessionSchema from "../models/session/SessionSchema.js";
import { getJwts } from "../utils/jwt.js";
import { generateRandomOTP } from "../utils/randomGenrator.js";
import { token } from "morgan";

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
    console.log(session);

    if (session?._id) {
      //updated user to active
      const user = await updateUser(
        { email: session.association },
        { status: "active" }
      );

      if (user?._id) {
        //send email notification

        userAccountVerfiedNotification({ email: user.email, name: user.fName });

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

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //get user by email
    console.log(email, password);

    const user = await getUserByEmail(email);
    if (user?._id) {
      console.log(user);

      // compare the password
      const isPasswordMatch = comparePassword(password, user.password);

      if (isPasswordMatch) {
        console.log("user authenticated successfully");

        //generate the tjwts
        const jwts = await getJwts(email);

        //response the jwts
        return responseClient({
          req,
          res,
          message: "LoginSuccessfull",
          payload: jwts,
        });
      }
    }
    const message = "Invalid login details";
    const statusCode = 401;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    //get the token

    const { email } = req.userInfo;

    //update the refreshJwt to empty ""

    await updateUser({ email }, { refreshJWT: " " });

    //remove the accessJWT from the session table
    await deleteMultipleSession({ association: email });
    responseClient({ req, res, message: "you are logged out" });
  } catch (error) {
    next(error);
  }
};

export const generateOTP = async (req, res, next) => {
  try {
    //get user by. email

    const { email } = req.body;
    console.log("REQ BODY:", req.body);

    const user = typeof email === "string" ? await getUserByEmail(email) : null;

    if (user?._id) {
      //generate the otp
      const otp = generateRandomOTP();
      console.log(otp);

      //store the otp in session table
      const session = await createNewSession({
        token: otp,
        association: email,
        expire: new Date(Date.now() + 1000 * 60 * 5), //expires in 5 min
      });

      if (session?._id) {
        console.log(session);

        //send otp tp users email
        const info = await passwordResetOTPSendEmail({
          email,
          name: user.fName,
          otp,
        });
        console.log(info);
      }
    }

    responseClient({ req, res, message: "OTP is sent to your email" });
  } catch (error) {
    next(error);
  }
};

export const resetNewPass = async (req, res, next) => {
  try {
    //get user email , pass and otp
    console.log(req.body);
    const { email, password, otp } = req.body;

    //graab the session
    const session = await getSession({
      token: otp,
      association: email,
    });

    if (session?._id) {
      //encrypt the password
      const hashPass = hashPassword(password);

      //update the user table

      const user = await updateUser({ email }, { password: hashPass });
      if (user?._id) {
        //send email notification as well
        userProfileUpdateNotificationEmail({ email, name: user.fName });

        return responseClient({
          req,
          res,
          message: "Your password has been updated, you can log in now.",
        });
      }
    }

    responseClient({
      req,
      res,
      statusCode: 400,
      message: "Invalid data or token expired",
    });
  } catch (error) {
    next(error);
  }
};
