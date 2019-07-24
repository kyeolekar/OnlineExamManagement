Session.setDefault("templateLoad", false);

Template.newExam.onRendered(function(){
  $('#simple-clone').cloneya({
    minimum:2,
    maximum:4
  });
  $('#newExam').parsley({trigger: 'change'});
  $('.clone').trigger('click');
});

Template.newExam.helpers({
  allQuestions: function(){
    return questions.find();  
  },
  sr: function(){
    return questions.find().count();
  },
  examId: function(){
    return Router.current().params.token;
  }
})


Template.newExam.events({
  "submit #newExam": function(e,t){
    e.preventDefault();
    var data=[], ans=[], isC=[], ansName=[];
    data.name = t.find("#questionName").value.trim();
    var i=0, isComplete=false, correctAns;
    // if($(".answers").length<2){
    //   FlashMessages.sendError("Please enter atleast two answers", {hideDelay: 2000})
    //   throw new Meteor.Error("Please enter atleast two answers");
    // };
    // $(".answers .name").each(function() {
    //     if(!$(this).val().trim()){
    //       FlashMessages.sendError("Please enter a valid answer", {hideDelay: 2000});
    //       throw new Meteor.Error("Please enter a valid answer");
    //     } else {
    //       ans.push({name:$(this).val()});
    //       // console.log(ans);
    //     }
    //     // console.log(this);
    // });
    // $(".answers .correct").each(function(){
    //     if($(this).is(':checked')){isComplete=true}
    //    ans.push($(this).is(':checked'));
    //    i++;
    // });

    // answerName1  correct1
    if($("#answerName").val()){ ans.push({name: $("#answerName").val(), isCorrect: $("#correct").is(':checked')  }) }
    if($("#answerName1").val()){ ans.push({name: $("#answerName1").val(), isCorrect: $("#correct1").is(':checked')  }) }
    if($("#answerName2").val()){ ans.push({name: $("#answerName2").val(), isCorrect: $("#correct2").is(':checked')  }) }
    if($("#answerName3").val()){ ans.push({name: $("#answerName3").val(), isCorrect: $("#correct3").is(':checked')  }) }

    if($("#answerName").val()){ansName.push({name: $("#answerName").val() }) }
    if($("#answerName1").val()){ ansName.push({name: $("#answerName1").val()  }) }
    if($("#answerName2").val()){ ansName.push({name: $("#answerName2").val()  }) }
    if($("#answerName3").val()){ ansName.push({name: $("#answerName3").val()  }) }
      // console.log(ans);
    for(i=0;i<ans.length;i++){
      if(ans[i].isCorrect){
        isComplete = true;
        correctAns = ans[i].name;
      }
    }
    console.log(correctAns);
    if(!isComplete || ans.length<2){
      FlashMessages.sendError("Please enter atleast two answers", {hideDelay: 2000})
      throw new Meteor.Error("Please enter atleast two answers");
    }
    if(!isComplete || !data.name){
      FlashMessages.sendError("Please select answer as correct", {hideDelay: 2000});
      throw new Meteor.Error("Please select one answer as correct");
    }
    var controller = Router.current();

    var examToken = controller.params.token;

    data.answer=t.find("#answerName").value;
    Meteor.call("addQuestion", data.name, ans, correctAns, ansName,  examToken, function(err, data){
      if(err){
        FlashMessages.sendError("Error adding Question");
      } else {
        if(data){
          FlashMessages.sendSuccess("Question added successfully");
          Router.go('/exam/'+examToken);
          $('#simple-clone').cloneya({
            // minimum:2,
            maximum:4
          });
          $("questionName").focus();
          // $(".delete").trigger('click');$(".delete").trigger('click');$(".delete").trigger('click');
          $("#newExam").trigger("reset");
        } else{
          FlashMessages.sendWarning("There was some problem with inserting data into the table.");
        }
      }
    });
  },
  "click .questionDelete": function(e,t){
    e.preventDefault();
    // alert("clicked"+);
    var controller = Router.current();

    var examToken = controller.params.token;

    Meteor.call("delQuestion", this._id, examToken, function(err, data){
      // if(data){
      FlashMessages.sendSuccess("Delted Successfully");
      // }
    });
  },
  "click .questionEdit": function(e,t){
    e.preventDefault();
    Router.go("/question/"+this._id);
  },
  "submit #updateExam": function(e,t){
    e.preventDefault();
    var controller = Router.current();
    var examToken = controller.params.token;
    name = t.find("#updateExamName").value;
    Meteor.call("updateExamName", examToken, name, function(err){
      if(err){
        FlashMessages.sendError("Error Encountered");
      } else {
        FlashMessages.sendSuccess("Update Successfully");
      }
    });
  },
  "submit #deleteExam": function(e,t){
    e.preventDefault();
    // alert("Delete");
    var controller = Router.current();

    var examToken = controller.params.token;

    Meteor.call("delExam", examToken, function(err, data){
      if(err){FlashMessages.sendError(err);} else{
      FlashMessages.sendSuccess("Delted Successfully");
      Router.go('/exam/');}
    });
  }
})