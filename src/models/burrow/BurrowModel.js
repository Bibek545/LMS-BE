import mongoose from "mongoose";
import burrowSchema from "./BurrowSchema.js";

const Burrow = mongoose.models.Burrow || mongoose.model("Burrow", burrowSchema);


export const createBurrow = (burrowArg) => {
  return burrowSchema.insertMany(burrowArg);
};

export const getBurrows = (filter) => {
  return burrowSchema.find(filter);
};

export const updateBurrow = (filter, obj) => {
  return burrowSchema.findOneAndUpdate(filter, obj, { new: true });
};

export default Burrow;
