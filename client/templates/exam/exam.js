// Meteor.subscribe("classOptions");
// Meteor.subscribe("subjectOptions");


Template.exam.rendered = function(){
  $('#addExam').parsley({trigger: 'change'});
}

Template.exam.helpers({
  localClass : function(){
    return className.find();
  },
  localSubjects : function(){
    return subjects.find();
  },
  exams: function(){
    return exams.find();
  },
  examsLength : function(){
    return exams.find().count();
  }
});

Template.exam.events({
  "submit #addExam": function(e,t){

    e.preventDefault();
    var data={},
        sub = $("#subjectName").val();
    data.examName = t.find("#examName").value;
    data.className = $("#className").val();
    data.subjectCode = parseInt(sub.substr(0, sub.indexOf('-')));
    data.userId = Meteor.userId;
    Meteor.call("addExam", data, function(err, data){
      if(err && !data){
        FlashMessages.sendError(err);
      } else{
        if(data){
          Session.set("newExamToken", data);
          if(Session.get("newExamToken")){Router.go('newExam',  {token: data});}
        }
      }
    })
  },
  "click .deleteExam": function(e,t){
    e.preventDefault();
    // alert("clicked");
    // var controller = Router.current();

    // var examToken = controller.params.token;

    Meteor.call("delExam", this._id, function(err, data){
      // if(data){
      FlashMessages.sendSuccess("Delted Successfully");
      // }
    });
  }
})