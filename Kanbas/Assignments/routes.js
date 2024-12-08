import * as assignmentsDao from "./dao.js";
export default function AssignmentsRoutes(app) {
    app.get("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = String(req.params);
        const assignments = await assignmentsDao.findAssignmentsForCourse(cid);
        res.json(assignments);
    })

    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await assignmentsDao.deleteAssignment(assignmentId);
        res.send(status);
    });

    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const updatedAssignment = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
        res.json(updatedAssignment);
    });

    app.get("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignment =  await assignmentsDao.findAssignmentById(assignmentId);
        res.json(assignment);
    });

}
