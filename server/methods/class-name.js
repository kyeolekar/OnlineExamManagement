Meteor.methods({

  addClass : function (data) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser, 
                            ['Administrator'])) {
      throw new Meteor.Error(403, "Access denied")
    } else {
      var id = className.insert({name:data.name, branch:data.branch});
      return id;
    }
  },
    editClass: function(data){
      var loggedInUser = Meteor.user()
      if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['Administrator'])) {
        throw new Meteor.Error(403, "Access denied")
      } else {
          var id = className.update({_id: data.id}, {name: data.name, branch: data.branch});
          return id;
        }
    },
    deleteClass: function(id){
      var loggedInUser = Meteor.user()
      if(!loggedInUser || !Roles.userIsInRole(loggedInUser, ['Administrator'])){
        throw new Meteor.Error(403, "Access denied")
      } else {
        var removed = className.remove(id);
        return removed;
      }
    }


})