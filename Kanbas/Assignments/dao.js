import model from "./model.js";
import courseModel from "../Courses/model.js";
import mongoose from "mongoose";
// import Database from "../Database/index.js";

export async function findAssignmentsForCourse(courseId) {
    const course = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseId) });
    // console.log(course);
    const assignments = await model.find({ course: course.number});
    // console.log(assignments);
    return assignments;
    // const { assignments } = Database;
    // return assignments.filter((assignment) => assignment.course === courseId);
}

export async function createAssignment(assignment) {
    const course = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(assignment.course) });
    assignment.course = course.number;
    delete assignment._id;
    const newAssignment = await model.create(assignment);
    // (await newAssignment).course = course.number;
    return newAssignment;
    // const newAssignment = {...assignment, _id: Date.now().toString()};
    // Database.assignments = [...Database.assignments, newAssignment];
    // return newAssignment;
}

export function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
    // const { assignments } = Database;
    // Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
}

export function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, assignmentUpdates);
    // const { assignments } = Database;
    // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    // Object.assign(assignment, assignmentUpdates);
    // return assignment;
}

export function findAssignmentById(assignmentId) {
    return model.findOne({ _id: assignmentId })
    // const { assignments } = Database;
    // return assignments.find((assignment) => assignment._id === assignmentId);
}