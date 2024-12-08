// import Database from "../Database/index.js";
import model from "./model.js";

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    const enrollmentss = enrollments.filter((enrollment) => enrollment.course !== null)
    return enrollmentss.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
    return model.create({ user, course });
    // const { enrollments } = Database;
    // const newEnrollment = { _id: Date.now(), user: userId, course: courseId }
    // enrollments.push(newEnrollment)
    // return newEnrollment;
}

export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
    // const { enrollments } = Database;
    // Database.enrollments = enrollments.filter((enrollment) => !(enrollment.user === userId && enrollment.course === courseId) );
    // return enrollments.length !== Database.enrollments.length
}

// export function findAllEnrollments() {
//     return Database.enrollments;
// }

// export function findEnrollmentsForUser(userId) {
//     return Database.enrollments.filter((enrollment) => enrollment.user === userId)
// }