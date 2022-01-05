import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    formName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    webhookUrl: {
      type: String,
    },
    returnUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Form", formSchema);
