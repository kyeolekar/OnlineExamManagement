Template.passwordRecovery.rendered = function () {
  $('#recovery-form').parsley({trigger: 'change'});
  $('#new-password').parsley({trigger: 'change'});
};
Template.passwordRecovery.helpers({
    resetPassword : function(t) {
      return Session.get('resetPassword');
    }
  });

if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}

Template.passwordRecovery.events({

      'submit #recovery-form' : function(e, t) {
        e.preventDefault()
        var email = t.find('#email').value.toLowerCase();

        if (email) {
          Accounts.forgotPassword({email: email}, function(err){
          if (err)
            FlashMessages.sendError(err);
          else {
            FlashMessages.sendSuccess('Email Sent. Please check your email.');
          }
        });
        }
      },

      'submit #new-password' : function(e, t) {
        e.preventDefault();
        var pw = t.find('#password').value,
            pw2 = t.find("#password2").value;
        if (pw===pw2) {
          Accounts.resetPassword(Session.get('resetPassword'), pw, function(err){
            if (err)
              FlashMessages.sendError(err);
            else {
              Session.set('resetPassword', null);
              FlashMessages.sendSuccess("Password changed successfully");
              Router.go('/');
            }
          });
        } else {
          FlashMessages.sendWarning("Passwords do not match");
        }
      }
  });

