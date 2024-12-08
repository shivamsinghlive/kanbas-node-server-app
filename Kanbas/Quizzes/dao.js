import model from "./model.js";

export const findQuizzesForCourse = (courseId) =>
  { 
    console.log(courseId);
    return model.find({ courseId: courseId });
  }
  
export const findQuiz = (id) => model.findById(id);
export const addQuiz = (cid, quiz) => {
  delete quiz._id;
  quiz.courseId = cid;
  return model.create(quiz);
};
export const updateQuiz = (id, quiz) =>
  model.updateOne({ _id: id }, { $set: quiz });
export const deleteQuiz = (id) => model.deleteOne({ _id: id });
