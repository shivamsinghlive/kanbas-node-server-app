import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  const handleError = (res, error, statusCode = 409) => {
    res.status(statusCode).json({ message: error.message });
  };

  const addQuiz = async (req, res) => {
    try {
      const { cid } = req.params;
      const quiz = await dao.addQuiz(cid, req.body);
      res.status(201).json(quiz);
    } catch (error) {
      handleError(res, error, 409);
    }
  };

  const getQuizzesForCourse = async (req, res) => {
    try {
      const { cid } = req.params;
      const quizzes = await dao.findQuizzesForCourse(cid);
      res.status(200).json(quizzes);
    } catch (error) {
      handleError(res, error, 404);
    }
  };

  const getQuiz = async (req, res) => {
    const { qid } = req.params;
    try {
      const quiz = await dao.findQuiz(qid);
      res.status(200).json(quiz);
    } catch (error) {
      handleError(res, error, 404);
    }
  };

  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    const updatedQuiz = req.body;
    try {
      const quiz = await dao.updateQuiz(qid, updatedQuiz);
      res.json(quiz);
    } catch (error) {
      handleError(res, error, 409);
    }
  };

  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    try {
      await dao.deleteQuiz(qid);
      res.sendStatus(200);
    } catch (error) {
      handleError(res, error, 409);
    }
  };

  const publishQuiz = async (req, res) => {
    const { qid } = req.params;
    try {
      const quiz = await dao.findQuiz(qid);
      quiz.isPublished = true;
      await dao.updateQuiz(qid, quiz);
      res.status(200).json(quiz);
    } catch (error) {
      handleError(res, error, 409);
    }
  };

  const unpublishQuiz = async (req, res) => {
    const { qid } = req.params;
    try {
      const quiz = await dao.findQuiz(qid);
      quiz.isPublished = false;
      await dao.updateQuiz(qid, quiz);
      res.status(200).json(quiz);
    } catch (error) {
      handleError(res, error, 409);
    }
  };

  app.post("/api/courses/:cid/quizzes", addQuiz);
  app.get("/api/courses/:cid/quizzes", getQuizzesForCourse);
  app.get("/api/quizzes/:qid/publish", publishQuiz);
  app.get("/api/quizzes/:qid/unpublish", unpublishQuiz);
  app.get("/api/quizzes/:qid", getQuiz);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
}
