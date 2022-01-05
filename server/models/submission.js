import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model("Submission", submissionSchema);
