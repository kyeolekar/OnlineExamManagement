Meteor.publish("classOptions", function(){
  if (Roles.userIsInRole(this.userId, ['Administrator', 'Staff'])) {
      return className.find();
    } else {
      this.stop();
      throw new Meteor.Error(403,"Not authorized");
    }
});

Meteor.publish("subjectOptions", function(){
  if (Roles.userIsInRole(this.userId, ['Administrator', 'Staff'])) {
      return subjects.find();
    } else {
      this.stop();
      throw new Meteor.Error(403,"Not authorized");
    }
});

