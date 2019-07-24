Template.takeExam.helpers({
  exam: function(){
    return exams.find();
  },
  getSubject: function(code){
    return subjects.findOne({code: parseInt(code)}).name;
  }

})



Template.takeExam.events({
  "submit #takeExam": function(e,t){
    e.preventDefault();
    var val = $("#inputExams").val().trim();
    var id = val.split('(');
    var subn = "Fundamentals of Data Structure"
    var a = id[0].trim();
    var code = subjects.findOne({name: a }).code;

    id = id[1].replace(')', '')
    var examId = exams.findOne({examName: id, subjectCode: code})._id;
    Meteor.call('newTakeExam', examId, Date.now(), function(err, data){
      if(err){
        FlashMessages.sendError(err);
      } else {
        Router.go('/student/exam/'+data)
      }
    })

  }
}) 