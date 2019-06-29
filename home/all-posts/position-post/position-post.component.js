(function(){
  'use strict';

  angular.module('app')
  .component('positionPost', {
    templateUrl: 'home/all-posts/position-post/position-post.view.html',
    bindings:{
      post: '<',
    }
  })

})();
