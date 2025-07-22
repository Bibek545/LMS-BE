import express from 'express'
// import { createNewUser } from '../models/user/UserModel.jsx';
import insertNewUserController, { activateUser } from '../controllers/AuthController.js';
import { newUserDataValidation, userActivationDataValidation } from '../middleware/validations/authDataValidation.js';

const router = express.Router()

// user sign up

router.post("/register", newUserDataValidation, insertNewUserController);

//activate user
router.post("/activate-user", userActivationDataValidation, activateUser)


export default router;