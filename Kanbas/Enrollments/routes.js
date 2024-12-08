import * as enrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app) {
    // app.get("/api/enrollments", (req, res) => {
    //     const { userId } = req.query;    
    //     const userEnrollments = enrollmentsDao.findEnrollmentsForUser(userId);
    //     res.json(userEnrollments);
    // })

    app.post("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        const newEnrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.status(201).json(newEnrollment);
    })

    app.delete("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        const unenrolled = enrollmentsDao.unenrollUserFromCourse(userId, courseId);
        if (unenrolled) {
            res.sendStatus(204);
        }
    })
}