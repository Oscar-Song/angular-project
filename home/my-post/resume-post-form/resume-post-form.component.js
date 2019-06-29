(function(){
  'use strict';

  angular.module('app')
  .component('resumePostForm', {
    templateUrl: 'home/my-post/resume-post-form/resume-post-form.view.html',
    bindings:{
      post: '=',
    }
  })

})();
