Meteor.methods({

  addExam : function (data) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser, 
                            ['Administrator', 'Staff'])) {
      throw new Meteor.Error(403, "Access denied")
    } else {
      var id = exams.insert({examName:data.examName, subjectCode: data.subjectCode, className:data.className, belongsTo: loggedInUser._id});
      return id;
    }
    // Else insert subject into array

    //db.options.update({subjects:{$exists: true}},{$push:{subjects:"3001- Computer Graphics"}})


  }
})