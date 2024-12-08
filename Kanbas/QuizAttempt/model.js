import mongoose from "mongoose";
import schema from "./schema.js";
const Model = mongoose.model("QuizAttemptModel", schema);
export default Model;
