(function(){
  'use strict';

  angular.module('app')
  .component('resumePost', {
    templateUrl: 'home/all-posts/resume-post/resume-post.view.html',
    bindings:{
      post: '<',
    }
  })

})();
