
Template.subjectEdit.onRendered(function(){
  $('#editSubject').parsley({trigger: 'change'});
});

Template.subjectEdit.helpers({
})

Template.subjectEdit.events({
  "submit #editSubject": function(e,t){
    e.preventDefault();
    var data={};
    data.code = parseInt(t.find("#code").value.trim());
    data.name = t.find("#subject").value.trim();

    var controller = Router.current();
    var classToken = controller.params.token;
    data.id = subjects.findOne({_id: classToken})._id;
    // console.log
    if(data.code && data.name && data.id){
      //edit function
      Meteor.call("editSubject", data, function(err, data){
        if(err){
          FlashMessages.sendError(err);
        } else {
          if(data){
            Router.go('subjectView');
            FlashMessages.sendSuccess("Record Updated Successfully");
          } else {
            FlashMessages.sendError("Error");
          }
        }
      })
    }

  }
})