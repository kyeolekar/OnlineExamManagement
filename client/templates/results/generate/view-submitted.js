Template.generateResult.helpers({
  getAllSubmits: function(){
    return takeExams.find({}, {takenBy: 1, submittedAnswers: 1});
  },
  count: function(){
    return takeExams.find({}, {takenBy: 1, submittedAnswers: 1}).count();
  },
  correct: function(){
    return questions.find({})
  }
});

Template.generateResult.events({
  "submit #generateAll": function(e,t){
    e.preventDefault();
    // alert("generating");
    var all = takeExams.find({}, {takenBy: 1, submittedAnswers: 1});
    all.forEach(function(item){
      console.log(item.takenBy)
      var taker = item.takenBy,
          correctCount = 0,
          ans = [];
      item.submittedAnswers.forEach(function(inner){
        a = questions.findOne({_id: inner.questionId});
        if(inner.answer == a.correctAnswer){ correctCount++; }
        ans.push({questionId: inner.questionId, isCorrect: inner.answer == a.correctAnswer});
      });
      console.log(ans);
      console.log("Correct Answers = "+ correctCount);

      var examId = Router.current().params.token;

      Meteor.call("createResult", examId, correctCount, ans, taker, function(err, data){
        if(err){
          FlashMessages.sendError("Error Inserting data");
          throw new Meteor.Error(601, "Error Inserting data");
        } else {
            Router.go('/exam/'+examId+'/view-result/');
        }
      });

    });



  }
})

