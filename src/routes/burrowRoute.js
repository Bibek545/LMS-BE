import express from "express";
import { responseClient } from "../middleware/responseClient.js";
import { userAuthMiddleware } from "../middleware/authMiddleware.js";
import BurrowSchema from "../models/burrow/BurrowSchema.js";
import { insertNewBurrow } from "../controllers/burrowController.js";

const router = express.Router();
// insert new Burrow
router.post("/", userAuthMiddleware, insertNewBurrow);

export default router;
