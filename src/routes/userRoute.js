import express from "express";
import { responseClient } from "../middleware/responseClient.js";
import { verifyAccessJWT } from "../utils/jwt.js";
import { getSession } from "../models/session/SessionModel.js";
import { getUserByEmail } from "../models/user/UserModel.js";

const router = express.Router();

router.get("/profile", async (req, res, payload) => {
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
          return responseClient({ 
            req, 
            res, 
            message: "User profile", 
            payload });
        }
      }
    };
    message = decoded === "jwt expired" ? decoded : "unauthorised"
  };
//   const message = decoded === "jwt expired" ? decoded : "unauthorised"
  responseClient({ req, res, message, statusCode: 401 });
});

export default router;
