Meteor.methods({
  "createResult": function(examId, correctAnswer, ans, taker){
    var loggedInUser = Meteor.user()

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser, 
                            ['Administrator', 'Staff'])) {
      throw new Meteor.Error(403, "Access denied")
    } else {
      var gen_already = results.findOne({examId: examId, takenBy: taker});
      if(!gen_already){
        var id = results.insert({examId: examId, correctAnswer: correctAnswer, answers : ans, takenBy: taker, master: loggedInUser._id});
        takeExams.update({examId: examId, takenBy: taker}, {$set: {resultGenerated: true}});
        return id;
      }
    }
  },
})