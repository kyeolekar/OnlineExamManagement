Template.editQuestion.helpers({
  question: function(){
    var q = questions.find()
    q.forEach(function(item) {
       name = item.name
       answer = item.answers;
    });
    return name;
  },
  answer: function(){
    var q = questions.find()
    q.forEach(function(item) {
       name = item.name
       answer = item.answers;
    });
    return answer.length;
  },
  examId: function(){
    var q = questions.find()
    q.forEach(function(item) {
       examId = item.examId;
       // answer = item.answers;
    });
       return examId;
    
  }
})

Template.editQuestion.onRendered(function(){
  $('#simple-clone').cloneya({
    minimum:2,
    maximum:4
  });

  var answer, questionObj;

  var controller = Router.current();
  var questionToken = controller.params.token;

  questionObj = questions.findOne(questionToken);

  for(i=0;i<questionObj.answers.length;i++){
    $(".clone").trigger('click');
  }
  if(questionObj.answers[0].name){$("#answerName").val(questionObj.answers[0].name);}
  if(questionObj.answers[1].name){$("#answerName1").val(questionObj.answers[1].name);}
  if(questionObj.answers[2].name){$("#answerName2").val(questionObj.answers[2].name);}
  if(questionObj.answers[3].name){$("#answerName3").val(questionObj.answers[3].name);}

  document.getElementById("correct").checked = questionObj.answers[0].isCorrect;
  document.getElementById("correct1").checked = questionObj.answers[1].isCorrect;
  document.getElementById("correct2").checked = questionObj.answers[2].isCorrect;
  document.getElementById("correct3").checked = questionObj.answers[3].isCorrect;


});

Template.editQuestion.events({
  "submit #editQuestion": function(e,t){
    e.preventDefault();
    var controller = Router.current(), examToken;
    var questionToken = controller.params.token;
    var q = questions.find()
    q.forEach(function(item) {
       examToken = item.examId;
       // answer = item.answers;
    });

    var data=[], ans=[], isC=[];
    data.name = t.find("#questionName").value.trim();
    // while(){
    var i=0, isComplete=false;
    if($(".answers").length<2){
      FlashMessages.sendError("Please enter atleast two answers", {hideDelay: 2000})
      throw new Meteor.Error("Please enter atleast two answers");
    };
    $(".answers .name").each(function() {
        if(!$(this).val().trim()){
          FlashMessages.sendError("Please enter a valid answer", {hideDelay: 2000});
          throw new Meteor.Error("Please enter a valid answer");
        } else {
          ans.push([$(this).val()]);
        }

            // alert($(this).val());
    });
    $(".answers .correct").each(function(){
        if($(this).is(':checked')){isComplete=true}
       ans[i].push($(this).is(':checked'));
       i++;
    });

    if(!isComplete || !data.name){
      FlashMessages.sendError("Please select answer as correct", {hideDelay: 2000});
      throw new Meteor.Error("Please select one answer as correct");
    }

    Meteor.call("editQuestion", questionToken, data.name, ans, examToken, function(err, data){
      if(err){
        FlashMessages.sendError("Error!!");
      } else{
        FlashMessages.sendSuccess("Updated successfully");
        Router.go('/exam/'+examToken);
      }
    })
  }
});