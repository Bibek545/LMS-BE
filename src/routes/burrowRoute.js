import express from "express";
import { responseClient } from "../middleware/responseClient.js";
import { userAuthMiddleware, adminAuthMiddleware } from "../middleware/authMiddleware.js";
import BurrowSchema from "../models/burrow/BurrowSchema.js";
import { insertNewBurrow, getBurrowController} from "../controllers/burrowController.js";
import { newBurrowDataValidation } from "../middleware/validations/burrowDataValidation.js";

const router = express.Router();
// insert new Burrow
router.post("/", userAuthMiddleware,newBurrowDataValidation,insertNewBurrow);

//return request for admin only
router.get("/admin", userAuthMiddleware, adminAuthMiddleware, getBurrowController)

//return for the user
router.get("/user", userAuthMiddleware ,getBurrowController)

export default router;
