import { getSession } from "../models/session/SessionModel.js";
import { getUserByEmail } from "../models/user/UserModel.js";
import { verifyAccessJWT } from "../utils/jwt.js";
import { responseClient } from "./responseClient.js";

export const userAuthMiddleware = async (req, res, next) => {
      //get accessJWT
  const { authorization } = req.headers;
  let message = "unauthorised";
  if (authorization) {
    const token = authorization.split(" ")[1];

    //check if valid

    const decoded = verifyAccessJWT(token);

    //check if the user exist in the session table
    if (decoded.email) {
      const tokenSession = await getSession({ token });
      if (tokenSession?._id) {
        //get user by email
        const user = await getUserByEmail(decoded.email);
        if (user?._id && user.status === "active") {
          //return the user
          req.userInfo = user;
          return next();
        //   return responseClient({ 
        //     req, 
        //     res, 
        //     message: "User profile", 
        //     payload });
        }
      }
    };
    message = decoded === "jwt expired" ? decoded : "unauthorised"
  };
//   const message = decoded === "jwt expired" ? decoded : "unauthorised"
  responseClient({ req, res, message, statusCode: 401 });
};