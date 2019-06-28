(function(){
  'use strict';

  angular.module('app')
  .component('postForm', {
    templateUrl: 'home/my-post/post-form/post-form.view.html',
    bindings:{
      post: '='
    }
  })

})();
