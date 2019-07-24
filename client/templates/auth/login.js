Template.login.rendered = function () {
  $('#login-form').parsley({trigger: 'change'});
};

Template.login.helpers({
  // error: "No error"
});

Template.login.events({
  "submit #login-form": function(e,t){
    e.preventDefault();
    var email = e.target.email.value.trim().toLowerCase(),
        password = e.target.password.value.trim();
    Meteor.loginWithPassword(email, password, function(err){
      if(err){
        FlashMessages.sendError("Invalid Username or password");
      }
      else{
        // if(Meteor.user().roles.indexOf("Student")>-1) {
          Router.go('takeExam');
        // } //else {
        //   Router.go('home');
        // }
      }
    });
  }
});

Meteor.methods({

});