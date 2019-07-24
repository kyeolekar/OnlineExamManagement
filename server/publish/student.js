Meteor.publish("allStudentExams", function(){
  return exams.find();
})

Meteor.publish("allStudentSubjects", function(){
  return subjects.find();
})

Meteor.publish("oneTakeExam", function(id){
  return takeExams.find({_id: id});
});

Meteor.publish("oneStudentExam", function(token){
  return exams.find({_id: token});
})

Meteor.publish("someQuestions", function(token){
  return questions.find({_id: {$in: token}}, {fields: {answers: 0, correctAnswer: 0}})
})

Meteor.publish("previousExams", function(){
  return takeExams.find({takenBy: this.userId});
})

Meteor.publish("allStudents", function(){
  var a = Meteor.users.find({roles: "Student"}, {fields: {services: 0, resume: 0}})
  return a;
})

Meteor.publish("findAllSubmitted", function(token){
  return takeExams.find({examId: token}, {takenBy: 1, submittedAnswers: 1, examId: 1})
})

Meteor.publish("getOneExamDetail", function(id){
  return exams.find({_id: id});
});
