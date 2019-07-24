Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: 'appNotFound',
  loadingTemplate: 'loading'
});

Router.configure({
  authenticate: 'login'
});

Router.plugin('auth', {
  except: [
    'login',
    'passwordRecovery',
    'register',
    'reset',
    'verifyEmail'
  ]

});



var goToHome = function(pause) {
  if (Meteor.user()) {
    if(Meteor.user().roles.indexOf("Student")>-1){
      Router.go('takeExam');
    }
    this.next();
  }
};
Router.onBeforeAction(goToHome, {only: ['home']});


Router.map(function(){
  this.route('register');
  this.route('login');
  this.route('settings');
  this.route('passwordRecovery',{ path: 'reset-password' });
  this.route('changePassword',{ path: 'change-password' });
  this.route('logout',{
    path: '/logout',
    action: function(){
      Meteor.logout();
      this.redirect('/');
    }
  });
  this.route('reset',{
    path: '/reset-password/:token',
    onBeforeAction: function(){
      Session.set('resetPassword', this.params.token);
      this.next();
    }
  })
  this.route('home',{
    path: '/'
  });
});


Router.map(function(){

  // Limited to Satff and Administrator
  this.route('exam',{
    waitOn: function(){
      Meteor.subscribe("subjectOptions")
      Meteor.subscribe("allExams");
      return Meteor.subscribe("classOptions");
    }
  });
  this.route('addSubject', { path: '/add-subject' });
  this.route('addClass', { path: '/add-class' });
  this.route('newExam', {
    path: '/exam/:token',
    onBeforeAction: function(){
      is_valid = exams.findOne({_id: this.params.token, belongsTo: Meteor.user()._id});
      if(is_valid){
        this.render('newExam');
        this.next();
      } else{
        this.render('appNotFound');
      }
    },
    data: function(){
      return exams.findOne({_id: this.params.token});
    },
    waitOn: function(){
      Meteor.subscribe("oneExam", this.params.token);
      return Meteor.subscribe( "allQuestions", this.params.token );
    }
  });

  this.route('generateResult',{
    path: '/exam/:token/result',
    waitOn: function(){
      // Subscribe to something
      Meteor.subscribe("findAllSubmitted", this.params.token);
      Meteor.subscribe("getOneExamDetail", this.params.token);
      var q = exams.findOne().questions;
      // console.log(q);

      Meteor.subscribe("allStudents");
      Meteor.subscribe("oneExam", this.params.token);
      Meteor.subscribe("oneResult", this.params.token);

      return Meteor.subscribe( "findSomeQuestions", q );


      // Get all exams having exam id this.params.token
      // var q = db.exams.findOne({_id: "kndMSehdWydgtsjG6"}, {questions: 1}).questions;
    }
    // onBeforeAction: function(){
    //   this.next();
    // }
  })

  this.route('viewResultPerformance',{
    path: '/exam/:token/view-result',
    waitOn: function(){
      Meteor.subscribe("allStudents");
      Meteor.subscribe("oneExam", this.params.token);
      return Meteor.subscribe("oneResult", this.params.token);
    }
  })

  this.route('question',{
    path: 'question/:token',    
    action: function(){
      this.render('editQuestion');
    },
    waitOn: function(){
      return Meteor.subscribe( "editQuestion", this.params.token );
    }
  });
  this.route('classView',{
    path: 'class',
    waitOn: function(){
      return Meteor.subscribe("classOptions");
    }
  });
  this.route('subjectView',{
    path: '/subjects',
    waitOn: function(){
      return Meteor.subscribe("subjectOptions");
    }
  });
  this.route('classEdit',{
    path: 'class/:token',
    onBeforeAction: function(){
      var is_valid = className.findOne({_id: this.params.token});
      if(is_valid){
        this.render('classEdit');
        this.next();
      } else{
        this.render('appNotFound');
      }
    },
    data: function(){
      return className.findOne({_id: this.params.token});
    },
    waitOn: function(){
      return Meteor.subscribe("classOptions");
    },
  });
  this.route('subjectEdit',{
    path: 'subject/:token',
    data: function(){
      return subjects.findOne({_id: this.params.token});
    },
    waitOn: function(){
      return Meteor.subscribe("subjectOptions");
    },
    onBeforeAction: function(){
      if(subjects.findOne({_id: this.params.token})){
        this.render('subjectEdit');
        this.next();
      } else{
        this.render('appNotFound');
      }
    },

  });

  this.route('viewStudents',{
    path: '/students',
    waitOn: function(){
      return Meteor.subscribe("allStudents");
    }
  });

  // this.route('studentDetailedView', function(){
  //   path: '/+'
  // })
});


Router.map(function(){
  this.route('takeExam',{
    path: '/student/exam/',
    waitOn: function(){
      Meteor.subscribe("allStudentSubjects");
      return Meteor.subscribe("allStudentExams");
    }
  });
  this.route('studentQuestionView',{
    path: '/student/exam/:id',
    waitOn: function(){
      Meteor.subscribe("oneTakeExam", this.params.id);
      var exa = takeExams.findOne({_id: this.params.id});
      Meteor.subscribe("oneStudentExam", exa.examId);
      var std = exams.findOne();
      return Meteor.subscribe("someQuestions", std.questions);
    },
    onBeforeAction: function(){
      var isValid = takeExams.findOne().submittedAnswers;
      // console.log(isValid);
      if(!isValid){
        this.render('studentQuestionView');
        this.next();
      } 
      else{
        this.render('alreadySubmitted');
      }
    }

  });
  this.route('previousExams',{
    path: '/student/previous/',
    waitOn: function(){
      return Meteor.subscribe('previousExams');
    }
  });
});
