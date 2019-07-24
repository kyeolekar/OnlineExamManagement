// Meteor.subscribe("subjectOptions");

Template.addClass.rendered = function () {
  $('#addClass').parsley({trigger: 'change'});
};


Template.addClass.events({
  "submit #addClass": function(e,t){
    e.preventDefault();
    var data={};
    data.name = t.find("#textClass").value.trim();
    data.branch = t.find("#branch").value.trim();
    if(data.name && data.branch){
      Meteor.call('addClass', data, function(err, data){
        if(err){
          if(!data){
            FlashMessages.sendError("Error Inserting data. Looks like the class name already exists.");
          } else{
            FlashMessages.sendError(err);
          }
        } else{
          // FlashMessages.sendSuccess(data.email);
          FlashMessages.sendSuccess("Class added successfully.");
          $("#addClass").trigger("reset");
          $("#textClass").focus();
          Router.go('/class');
        }
      });

    } else {
      FlashMessages.sendWarning("Please enter a valid class name");
    }
  }
});

Template.showSubjects.helpers({
  // allSubjects: function(){
  //   localOptions = options.find({subjects:{$exists: true}});
  //   localOptions.forEach(function(doc){
  //     // availableOptions= doc.className;
  //     availableSubjects= doc.subjects;
  //     });
  //   return availableSubjects;
  // }
})

