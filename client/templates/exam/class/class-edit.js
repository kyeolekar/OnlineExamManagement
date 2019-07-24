Template.classEdit.onRendered(function(){
  $('#editClass').parsley({trigger: 'change'});
});

Template.classEdit.helpers({
  className: function(){
    var controller = Router.current();

    var classToken = controller.params.token;
    return className.findOne({_id: classToken});
  }
})

Template.classEdit.events({
  "submit #editClass": function(e,t){
    e.preventDefault();
    var data={};
    data.name = t.find("#textClass").value.trim();
    data.branch = t.find("#branch").value.trim();

    var controller = Router.current();
    var classToken = controller.params.token;
    data.id = className.findOne({_id: classToken})._id;
    // console.log
    if(data.name && data.branch && data.id){
      //edit function
      Meteor.call("editClass", data, function(err, data){
        if(err){
          FlashMessages.sendError(err);
        } else {
          if(data){
            FlashMessages.sendSuccess("Record Updated Successfully");
          } else {
            FlashMessages.sendError("Error");
          }
        }
      })
    }



  }
})