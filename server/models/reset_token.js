import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Reset_token", resetTokenSchema);
