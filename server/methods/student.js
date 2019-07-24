Meteor.methods({

  newTakeExam : function (id, date) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser, 
                            ['Student'])) {
      throw new Meteor.Error(403, "Access denied")
    } else {
      var alreadySubmitted = takeExams.findOne({takenBy: loggedInUser._id, examId:id })
      if(!alreadySubmitted){
        var id = takeExams.insert({takenBy: loggedInUser._id, examId:id, startedAt: date, resultGenerated: false, master: loggedInUser._id });
        return id;
      } else {
        throw new Meteor.Error(600, "You have already taken this exam");
        FlashMessages.sendError("Looks like you have already taken the exam once", { autoHide: false, hideDelay: 8000 });
      }

    }
  },

  addAnswersToExams: function(id, ans){
    var loggedInUser = Meteor.user()
    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser, 
                            ['Student'])) {
      throw new Meteor.Error(403, "Access denied")
    } else {
      var data = takeExams.update({_id: id, master: loggedInUser._id}, {$set: {submittedAnswers: ans}});
      if(data){ Meteor.users.update({_id: loggedInUser._id}, {$inc: { "profile.examsTaken": 1 }}) }
      return data;
    }
  }


})