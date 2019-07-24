Template.viewResultPerformance.helpers({
  info: function(){
    var i = Router.current().params.token;
    return results.find({examId: i});
  },
  user : function(id){
    return Meteor.users.findOne({_id: id}).emails[0].address;
  },
  getExam: function(){
    var i = Router.current().params.token;
    return exams.findOne({_id: i});
  },
  examId: function(){
    return Router.current().params.token;
  }
})
