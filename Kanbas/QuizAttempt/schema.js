import mongoose from "mongoose";

// Define the subdocument schema for a question
const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionModel",
    required: true,
  },
  answerType: {
    type: String,
    enum: [
      "Multiple Choice",
      "Multiple Select",
      "True/False",
      "Fill in the Blanks",
    ],
    required: true,
  },
  selectedChoices: [
    {
      text: String, // For Multiple Choice/Select
      isSelected: Boolean,
      isCorrect: Boolean, // Indicates if the selected choice is correct
    },
  ],
  fillInAnswers: [
    {
      answer: String, // For Fill in the Blanks
      isCorrect: Boolean, // Indicates if the provided answer is correct
    },
  ],
  trueFalseAnswer: { type: Boolean }, // For True/False
  isCorrect: Boolean, // Overall correctness of the question
});

const QuizAttemptSchema = new mongoose.Schema(
  {
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    score: Number,
    startedAt: String,
    completedAt: String,
    timeTaken: Number,
    attemptNumber: { type: Number, default: 1 },
    answers: [AnswerSchema],
  },
  { collection: "quizattempts" }
);
export default QuizAttemptSchema;
