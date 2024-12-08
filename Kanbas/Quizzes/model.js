import mongoose from "mongoose";
import schema from "./schema.js";
const Model = mongoose.model("QuizModel", schema);
export default Model;
