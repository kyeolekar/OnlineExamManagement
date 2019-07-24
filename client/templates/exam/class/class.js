// Subscribe


Template.classView.helpers({
  classNames: function(){
    return className.find({});
  },
  classCount: function(){
    return className.find().count();
  }
});

Template.classView.events({
  "click .classDelete": function(){
    Meteor.call("deleteClass", this._id, function(err, data){
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