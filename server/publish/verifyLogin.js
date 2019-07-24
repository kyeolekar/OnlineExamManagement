Meteor.publish("verifyLogin", function(){
  user = Meteor.users.findOne({_id:this.userId})
  if(user){
    if(user.emails[0].verified){
      
    }
  }
});