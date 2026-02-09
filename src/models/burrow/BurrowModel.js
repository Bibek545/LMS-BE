import mongoose from "mongoose";
import burrowSchema from "./BurrowSchema.js";

const Burrow = mongoose.models.Burrow || mongoose.model("Burrow", burrowSchema);

export const createNewBurrow = (burrowObj) => {
  return Burrow.create(burrowObj);
};

export default Burrow;
