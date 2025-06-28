import express from 'express'
// import { createNewUser } from '../models/user/UserModel.jsx';
import insertNewUserController from '../controllers/AuthController.js';
const router = express.Router()

// user sign up

router.post("/register", insertNewUserController);

export default router;