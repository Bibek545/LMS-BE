import express from 'express'
// import { createNewUser } from '../models/user/UserModel.jsx';
import insertNewUserController, { activateUser, generateOTP, loginUser, logoutUser, resetNewPass } from '../controllers/AuthController.js';
import { newUserDataValidation, userActivationDataValidation, loginDataValidation, resetPasswordValidation } from '../middleware/validations/authDataValidation.js';
import { renewAccessJWTMiddleware, userAuthMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router()

// user sign up

router.post("/register", newUserDataValidation, insertNewUserController);

//activate user
router.post("/activate-user", userActivationDataValidation, activateUser)

//loginuser
router.post("/login", loginDataValidation, loginUser)

//renew-jwt
router.get("/renew-jwt", renewAccessJWTMiddleware)

//loging out the user 
router.get("/logout", userAuthMiddleware, logoutUser )

//receving the OTP
router.post("/otp", generateOTP)

//resetting the password
router.post("/reset-password",resetPasswordValidation, resetNewPass)

export default router;