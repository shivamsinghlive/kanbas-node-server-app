import * as dao from "./dao.js";

export default function QuizAttemptRoutes(app) {
  const handleError = (res, error, statusCode = 409) => {
    res.status(statusCode).json({ message: error.message });
  };

  const getLatestQuizAttempt = async (req, res) => {
    try {
      const { qid, sid } = req.params;
      const quizAttempt = await dao.getLatestQuizAttempt(qid, sid);
      res.status(201).json(quizAttempt);
    } catch (error) {
      handleError(res, error, 409);
    }
  };

  const submitQuizAttempt = async (req, res) => {
    try {
      const quizAttempt = await dao.submitQuiz(req.body);
      res.status(201).json(quizAttempt);
    } catch (error) {
      handleError(res, error, 409);
    }
  };
  app.get("/api/quizzes/:qid/:sid", getLatestQuizAttempt);
  app.post("/api/quizzes/submitquiz", submitQuizAttempt);
}
