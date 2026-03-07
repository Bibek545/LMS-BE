import mongoose from "mongoose";
import burrowSchema from "./BurrowSchema.js";

const Burrow = mongoose.models.Burrow || mongoose.model("Burrow", burrowSchema);


export const createBurrow = (burrowArg) => {
  return burrowSchema.insertMany(burrowArg);
};

export const getBurrows = (filter) => {
  return burrowSchema.find(filter);
};

export default Burrow;
