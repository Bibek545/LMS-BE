import express from 'express'
// import { createNewUser } from '../models/user/UserModel.jsx';
import insertNewUserController, { activateUser } from '../controllers/AuthController.js';
import { validateData } from '../middleware/validations/joiValidation.js';
const router = express.Router()

// user sign up

router.post("/register", validateData, insertNewUserController);

//activate user
router.post("/activate-user", activateUser)


export default router;