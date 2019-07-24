Meteor.publish("allTakenExams", function(){
  var i = exams.find({belongsTo: this.userId});
  var res = [];
  i.forEach(function(item){
    res.push(item._id);
  })
  return takeExams.find({ resultGenerated: false, examId: {$in: res } })
})