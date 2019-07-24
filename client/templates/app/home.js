Meteor.subscribe("allExams");
Meteor.subscribe("allTakenExams");
Template.home.helpers({
  examCount: function(){
    return exams.find().count();
  },
  singleCount: function(){
    if(exams.find().count()===1){
      return exams.find().count();
    }
  },
  takerCount : function(){
    return takeExams.find().count();
  },
  taker : function(){
    return takeExams.find();
  }
})