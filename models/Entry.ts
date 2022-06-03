import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces";

export interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-process", "completed"],
      message: "{VALUE} is no a valid status",
    },
    default: "pending",
  },
  createdAt: { type: Number },
});

export const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);
