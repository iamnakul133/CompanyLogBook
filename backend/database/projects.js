import mongoose from "mongoose";
const { Schema } = mongoose;
const projectSchema = new Schema({
  Theme: { type: String, required: true },
  Reason: { type: String },
  Category: { type: String },
  type1: { type: String },
  Division: { type: String },
  Priority: { type: String },
  Department: { type: String },
  Location: { type: String },
  start: {
    type: String,
  },
  end: { type: String },
  status: { type: String },
});
export default mongoose.model("projects", projectSchema);
