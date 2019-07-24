
Template.addSubject.rendered = function () {
  $('#addSubject').parsley({trigger: 'change'});
};


Template.addSubject.events({
  "submit #addSubject": function(e,t){
    e.preventDefault();
    var data={};
    data.name = t.find("#subject").value.trim();
    data.code = parseInt(t.find("#code").value.trim());
    if(data.name){
      Meteor.call('addSubject', data, function(err, data){
        if(err){
          if(!data){
            FlashMessages.sendError("Error Inserting data. Looks like the class name already exists.");
          } else{
            FlashMessages.sendError(err);
          }

        } else{
          // FlashMessages.sendSuccess(data.email);
          FlashMessages.sendSuccess("Subject added successfully.");
          $("#addSubject").trigger("reset");
          $("#code").focus();
          Router.go('/subjects');
        }
      });

    } else {
      FlashMessages.sendWarning("Please enter a valid subject name");
    }
  }
});



