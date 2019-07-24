Template.changePassword.rendered = function () {
  $('#change-password').parsley({trigger: 'change'});
};

Template.changePassword.events({
  "submit #change-password": function(e,t){
    var old = t.find('#old-password').value,
        pw = t.find('#password').value,
        pw2 = t.find("#password2").value;
    if (pw===pw2) {
      Accounts.changePassword(old, pw, function(err){
        if (err)
          FlashMessages.sendError(err);
        else {
          FlashMessages.sendSuccess("Password changed successfully");
          // Router.go('/');
        }
      });
    } else {
      FlashMessages.sendWarning("Passwords do not match");
    }
  }
});

// Template.registerHelper("username", function(){
//   if(Meteor.user().username){
//     return Meteor.user().username;
//   }
//   return Meteor.user().email;
// })
