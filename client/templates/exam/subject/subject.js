// Subscribe


Template.subjectView.helpers({
  allSubjects: function(){
    return subjects.find();
  },
  subjectCount: function(){
    return subjects.find().count();
  }
});

Template.subjectView.events({
  "click .subjectDelete": function(){
    Meteor.call("deleteSubject", this._id, function(err, data){
      if(err){
        FlashMessages.sendError("Error Occured");
      } else {
        if(data){
          FlashMessages.sendSuccess("Deleted Successfully");
        } else {
          FlashMessages.sendError("Error Deleting the class");
        }
      }
    });
  }
})