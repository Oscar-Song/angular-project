(function() {
  'use strict';

  angular
    .module('app')
    .controller('AllPostsController', AllPostsController);

  AllPostsController.$inject = ['currentUser', 'PostService'];
  function AllPostsController(currentUser, PostService){
    var vm = this;

    vm.onlinePosts = null;

    vm.viewPost = viewPost;

    initController();

    function initController(){
      resetPost();
      loadOnlinePosts();
    }

    function resetPost(){
      vm.post = {};
    }

    function loadOnlinePosts(){
      var statusToView = (currentUser.status === "employer") ? "applicant" : "employer";
      PostService.GetAllPosts(statusToView)
      .then(function(posts){
        vm.onlinePosts = posts;
      });
    }

    function viewPost(id){
      PostService.GetPostById(id)
      .then(function(post){
        vm.post = post;
      });
    }
  }

})();
