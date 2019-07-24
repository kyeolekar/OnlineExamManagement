Meteor.methods({

  newExam : function (data) {
    var loggedInUser = Meteor.user()
    if (!loggedInUser ||!Roles.userIsInRole(loggedInUser, ['Administrator', 'Staff'])) {
      throw new Meteor.Error(403, "Access denied")
    } else {
      
      exams.update({examName:data.examName, subjectCode: data.subjectCode, className:data.className, belongsTo: loggedInUser._id});
      return id;
    }
  },

  delExam: function(id, examToken){
    var loggedInUser = Meteor.user()
    if (!loggedInUser ||!Roles.userIsInRole(loggedInUser, ['Administrator', 'Staff'])) {
      throw new Meteor.Error(403, "Access denied")
    } else {
      // takeExams.remove({examId: })
      var updated = exams.find({_id: id, belongsTo: Meteor.user()._id});
      if(updated){ 
       results.remove({examId: id, master: loggedInUser._id});
       exams.remove({_id:id});
       questions.remove({examId:id});
       takeExams.remove({examId:id});
      }
    }
  },
  updateExamName: function(id, name){
    var loggedInUser = Meteor.user()
    if (!loggedInUser ||!Roles.userIsInRole(loggedInUser, ['Administrator', 'Staff'])) {
      throw new Meteor.Error(403, "Access denied")
    } else {
      exams.update({_id: id},
        {$set:{examName: name}});
    }
  },

    addQuestion: function(name, ans, correctAns, ansNameOnly, examToken){
      var loggedInUser = Meteor.user()
      if (!loggedInUser ||!Roles.userIsInRole(loggedInUser, ['Administrator', 'Staff'])) {
        throw new Meteor.Error(403, "Access denied")
      } else {
        var id = questions.insert({
          name: name,
          answers: ans,
          studentAnswer: ansNameOnly,
          correctAnswer: correctAns,
          belongsTo: Meteor.user()._id,
          examId: examToken
        });
        // return id;
        var updated = exams.update(examToken,{$push:{questions: id}});
        if(updated){ return true; }
        else{ questions.remove(id); return false; }
      }
    },

    editQuestion: function(questionToken, name, ans, examToken){
      var loggedInUser = Meteor.user()
      if (!loggedInUser ||!Roles.userIsInRole(loggedInUser, ['Administrator', 'Staff'])) {
        throw new Meteor.Error(403, "Access denied")
      } else {

        questions.update(questionToken,{
          name: name,
          answers: ans,
          belongsTo: Meteor.user()._id,
          examId: examToken
        });
      }
    },

    delQuestion: function(id, examToken){
      var loggedInUser = Meteor.user()
      if (!loggedInUser ||!Roles.userIsInRole(loggedInUser, ['Administrator', 'Staff'])) {
        throw new Meteor.Error(403, "Access denied")
      } else {

        var updated = exams.update({_id: examToken},{$pull:{questions: id}});
        if(updated){ 
        questions.remove({
          _id: id,
          belongsTo: Meteor.user()._id,
          examId: examToken
        });
        if(!ok){
            exams.update(examToken,{$push:{questions: id}});
            throw new Meteor.Error(403, "Access denied");
          } else {
            return true;
          }
        }
      }
    }
    // Else insert subject into array

    //db.options.update({subjects:{$exists: true}},{$push:{subjects:"3001- Computer Graphics"}})

})