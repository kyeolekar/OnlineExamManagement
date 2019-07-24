Meteor.methods({
  'newUser': function(data, roles){
    var userId;    
    if(roles[0]==="Student"){
      userId = Accounts.createUser({
        email:data.email, 
        password: data.password,
        profile: {
          name: data.name,
          examsTaken: 0
        }
      });
    } else {
      if(!data.key){
        throw new Meteor.Error("Please enter the registration key given by your administrator");
        FlashMessages.sendError("Please enter a registration key");
      } else {
        // var original_key = db_admin.findOne({key: data.key});
        var original_key = 'secret';
        if(!original_key){
          throw new Meteor.Error("Invalid Key. Please Contact your Administrator");
        }
      }
      userId = Accounts.createUser({
        email:data.email, 
        password: data.password,
        profile: {
          name: data.name
        }
      });
    }
    if(userId){
      Roles.addUsersToRoles(userId, roles);
      // Accounts.sendVerificationEmail(userId);
      return userId;
    };
  }
});