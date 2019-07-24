Template.viewStudents.helpers({
  // Get users from db
  studentDetails: function(){
    return Meteor.users.find({roles: "Student"});
  }
})