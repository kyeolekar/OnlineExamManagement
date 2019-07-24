Template.appBody.helpers({
  username: function(){
    return Meteor.user().profile.name;
  },
  activeClass: function(text){
    return Router.current().route.path(this)===text;
  }

})
// console.log(Meteor.user().emails[0].address);