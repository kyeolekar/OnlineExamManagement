Template.register.rendered = function () {
  $('#register-form').parsley({trigger: 'change'});
};


Template.register.events({
  "submit #register-form": function(e,t){
    e.preventDefault();
    var data={},
        role = t.find("#role").value,
        roles=[];
    roles.push(role);
    data.email = e.target.email.value.toLowerCase().trim(),
    data.name = t.find("#name").value.trim(),
    data.password = e.target.password.value.trim(),
    data.passwordConfirm = t.find("#password2").value.trim();
    data.key = t.find("#key").value.trim();
    if(!data.email || !data.name || !data.password || !data.passwordConfirm ){
      FlashMessages.sendError("Please Complete the form");
      throw new Meteor.Error("Please complete the form");
    }
    if(role==="Administrator" || role==="Staff"){
      if(!data.key){
        FlashMessages.sendError("Please enter a valid key supplied by your admin");
        throw new Meteor.Error("Please enter a valid key supplied by your admin");
      }
    }
    if(data.password===data.passwordConfirm){
      Meteor.call('newUser', data, roles, function(err){
        if(err){
          FlashMessages.sendError(err);
        } else{
          // FlashMessages.sendSuccess(data.email);
          Meteor.loginWithPassword(data.email, data.password, function(err){
            if(err){
              FlashMessages.sendError("Invalid Username or password");
            }
            else{
              Router.go('/');
            }
          });
        }
      });

    } else {
      FlashMessages.sendWarning("Passwords do not match.");
    }
  }
})

