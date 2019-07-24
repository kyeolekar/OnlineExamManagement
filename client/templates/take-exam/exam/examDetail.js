Template.studentQuestionView.onRendered(function(){
  
//moment.unix(1437202312192/1000).format("MM/DD/YYYY HH:mm:ss")
var timeStamp = takeExams.findOne().startedAt;
var timeNow = moment.unix(timeStamp/1000).format("YYYY/MM/DD HH:mm:ss")
timeNow = moment(timeNow).add(30, 'minutes').format("YYYY/MM/DD HH:mm:ss");
// timep = timeNow.toString();
// console.log(timep);
console.log(timeNow);
$('#getting-started').countdown(timeNow, function(event) {
  $(this).html(event.strftime('%M:%S'));
  // on('finish.countdown', alert("finished"));
});

$('#getting-started').on('finish.countdown', function() {
  FlashMessages.sendError("The Time Alloted for the test is complete, the test will automatically submit all selected answers now.", {hideDelay: 5000})
  $("#submitAnswers").submit();
});

})


Template.studentQuestionView.helpers({
  exam: function(){
    return takeExams.findOne();
  },
  question: function(){
    return exams.findOne();
  },
  allQ: function(){
    return questions.find();
  },
  username: function(){
    return Meteor.user().profile.name;
  }
});

Template.studentQuestionView.events({
  "submit #submitAnswers": function(e,t){
    e.preventDefault();
    var ans=[];
    var allQuestions = questions.find();
    allQuestions.forEach(function(item){
      a = $("input[name="+item._id+"]:checked").val()
      ans.push({questionId: item._id, answer: a });
    });
    var controller = Router.current();
    var id = controller.params.id;

    var timeStamp = takeExams.findOne().startedAt;
    var endTime = moment.unix(timeStamp/1000).format("YYYY/MM/DD HH:mm:ss")
    endTime = moment(endTime).add(30, 'minutes').unix();

    var submitTime = moment.unix(Date.now()/1000).format("YYYY/MM/DD HH:mm:ss")
    submitTime = moment(submitTime).unix();

    // var dif =moment.unix(moment(timeNow,"YYYY/MM/DD HH:mm:ss").diff(moment.unix(submitTime/1000).format("YYYY/MM/DD HH:mm:ss"))).format("HH:mm:ss")

    var timeDiff = parseInt(endTime)-parseInt(submitTime);
    // console.log(timeDiff);
    if(timeDiff>0){
      Meteor.call("addAnswersToExams", id, ans, function(error, data){
        if(error){
          FlashMessages.sendError("Error: "+error);
        } else {
          if(data) {
            FlashMessages.sendSuccess("Submitted Successfully. Logged Out.", { autoHide: false});
            Router.go('/logout');
          } else {
            FlashMessages.sendError("Error Sending Data to the server");
          }
        }
      })
    } else {
      FlashMessages.sendError("The time alloted for the exam has ended you cannot submit your answers now. Please contact a staff member.")
    }
  }
})