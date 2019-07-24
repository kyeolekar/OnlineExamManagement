Meteor.methods({

  addSubject : function (data) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser, 
                            ['Administrator'])) {
      throw new Meteor.Error(403, "Access denied")
    } else {
      var id = subjects.insert({name:data.name, code:parseInt(data.code)});
      return id;
    }
  },
  editSubject: function(data){
    var loggedInUser = Meteor.user()
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['Administrator'])) {
      throw new Meteor.Error(403, "Access denied")
    } else {
        var id = subjects.update({_id: data.id}, {name: data.name, code: data.code});
        return id;
      }
  },
  deleteSubject: function(id){
    var loggedInUser = Meteor.user()
    if(!loggedInUser || !Roles.userIsInRole(loggedInUser, ['Administrator'])){
      throw new Meteor.Error(403, "Access denied")
    } else {
      var removed = subjects.remove(id);
      return removed;
    }
  }

    // Else insert subject into array

    //db.options.update({subjects:{$exists: true}},{$push:{subjects:"3001- Computer Graphics"}})


})