import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        title: String,
        course: String,
        description: String,
        dueDate: String,
        points: String,
        availableDate: String
    },
    { collection: "assignments" }
);
export default schema;
