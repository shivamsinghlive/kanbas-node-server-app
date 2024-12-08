import model from "./model.js";
import quizModel from "../Quizzes/model.js";

export const submitQuiz = async (quizAttempt) => {
  const { studentId, quizId } = quizAttempt;
  const existingAttempt = await model.findOne({
    studentId: studentId,
    quizId: quizId,
  });
  if (existingAttempt) {
    const quiz = await quizModel.findById(quizId);
    if (quiz.allowMultipleAttempts) {
      const newAttemptNumber = existingAttempt.attemptNumber + 1;
      quizAttempt.attemptNumber = newAttemptNumber;
      return await model.create(quizAttempt);
    } else {
      throw new Error("This quiz does not allow multiple attempts");
    }
  } else {
    return await model.create(quizAttempt);
  }
};

export const getLatestQuizAttempt = async (qid, sid) => {
  const latestAttempt = await model
    .findOne({ quizId: qid, studentId: sid })
    .sort({ attemptNumber: -1 });
  return latestAttempt;
};
