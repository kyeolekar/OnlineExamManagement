Meteor.publish("allExams", function(){

  if (Roles.userIsInRole(this.userId, ['Administrator', 'Staff'])) {
      return exams.find({belongsTo:this.userId});
    } else {
      this.stop();
      throw new Meteor.Error(403,"Not authorized");
    }

    
})

Meteor.publish("oneExam", function(token){

  if (Roles.userIsInRole(this.userId, ['Administrator', 'Staff'])) {
      return exams.find({_id: token, belongsTo:this.userId});
    } else {
      this.stop();
      throw new Meteor.Error(403,"Not authorized");
    }

  
})

Meteor.publish("allQuestions", function(token){


  if (Roles.userIsInRole(this.userId, ['Administrator', 'Staff'])) {
    return questions.find({belongsTo: this.userId, examId: token});
    } else {
      this.stop();
      throw new Meteor.Error(403,"Not authorized");
    }

})

// Meteor.publish("allClassNames", function(){
  // if (Roles.userIsInRole(this.userId, ['Administrator'])) {
      // return className.find({});
    // } else {
      // user not authorized. do not publish secrets
      // this.stop();
      // return;

    // }
// })

// Meteor.publish("allSubjects", function(){
  // if (Roles.userIsInRole(this.userId, ['Administrator'])) {
      // return subjects.find({});
    // } else {
      // user not authorized. do not publish secrets
      // this.stop();
      // return;

    // }
// })

Meteor.publish("editQuestion", function(token){

  if (Roles.userIsInRole(this.userId, ['Administrator', 'Staff'])) {
    return questions.find({_id: token, belongsTo: this.userId});
    } else {
      this.stop();
      throw new Meteor.Error(403,"Not authorized");
    }

  
})



Meteor.publish("oneResult", function(token){

  if (Roles.userIsInRole(this.userId, ['Administrator', 'Staff'])) {
    return results.find({examId: token, master: this.userId });
    } else {
      this.stop();
      throw new Meteor.Error(403,"Not authorized");
    }

  
})


Meteor.publish("findSomeQuestions", function(q){
  return questions.find({_id: {$in: q }})
})