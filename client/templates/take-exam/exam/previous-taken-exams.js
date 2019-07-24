Template.previousExams.helpers({
  prev: function(){
    return takeExams.find({takenBy: Meteor.user()._id})
  }
});