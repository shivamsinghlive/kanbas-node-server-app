import mongoose from "mongoose";

// Define the subdocument schema for a question
const QuestionSchema = new mongoose.Schema({
  points: Number,
  questionText: String,
  questionType: {
    type: String,
    enum: [
      "Multiple Choice",
      "Multiple Select",
      "True/False",
      "Fill in the Blanks",
    ],
    default: "Multiple Choice",
  },
  choices: [
    {
      text: String,
      isCorrect: Boolean,
    },
  ],
  blanks: [
    {
      answer: String,
    },
  ],
});

const QuizSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    title: String,
    description: String,
    points: Number,
    quizType: {
      type: String,
      enum: ["Ungraded Quiz", "Graded Quiz"],
      default: "Graded Quiz",
    },
    timeLimit: Number,
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },
    shuffleForEachStudent: Boolean,
    allowMultipleAttempts: Boolean,
    isPublished: Boolean,
    viewResponse: {
      type: String,
      enum: ["Always"],
      default: "Always",
    },
    showCorrectAnswers: {
      type: String,
      enum: ["Immediately", "After all attempts are graded", "After due date"],
      default: "Immediately",
    },
    accessCode: String,
    singleQuestionAtATime: Boolean,
    cameraRequired: Boolean,
    lockQuestionsAfterAnswering: Boolean,
    dueDate: String,
    availabilityDate: String,
    untilDate: String,
    questions: [QuestionSchema],
  },
  { collection: "quizzes" }
);
export default QuizSchema;
