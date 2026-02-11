import express from "express";
import { responseClient } from "../middleware/responseClient.js";
import { userAuthMiddleware } from "../middleware/authMiddleware.js";
import BurrowSchema from "../models/burrow/BurrowSchema.js";
import { insertNewBurrow } from "../controllers/burrowController.js";
import { newBurrowDataValidation } from "../middleware/validations/burrowDataValidation.js";

const router = express.Router();
// insert new Burrow
router.post("/", userAuthMiddleware,newBurrowDataValidation,insertNewBurrow);

export default router;
