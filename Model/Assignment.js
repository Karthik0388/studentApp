import { Schema, model } from "mongoose";
const AssignmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    Category: { type: String, required: true },
    trainer: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

let AssignmentModel = model("Assignment", AssignmentSchema);

export default AssignmentModel;
