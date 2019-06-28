(function(){
  'use strict';

  angular.module('app')
  .controller('MyPostController', MyPostController);

  MyPostController.$inject = ['currentUser', 'PostService', 'FlashService', '$state'];
  function MyPostController(currentUser, PostService, FlashService, $state){
    var vm = this;

    vm.post = {};
    vm.allMyPosts = null;

    //Get necessary user info for one post. Also to ensure that password and id are not put into part of a post
    vm.post.username = currentUser.username;
    vm.post.type = currentUser.status;
    vm.post.name = currentUser.firstName + " " + currentUser.lastName;

    //TODO: need to get the user and bind some of its info to this post
    vm.createPost = createPost;
    vm.deletePost = deletePost;

    loadAllMyPosts();

    function loadAllMyPosts(){
      PostService.GetAllPosts(currentUser.status)
        .then(function(posts){
          vm.allMyPosts = posts;
        })
    }

    function createPost(){
      vm.dataLoading = true;
      PostService.Create(vm.post)
      .then(function(response){
        if(response.success){
          FlashService.Success('Post created', true);
          loadAllMyPosts();
          $state.go('app.my-post.list-posts');
        } else{
          FlashService.Error(response.message);
          vm.dataLoading = false;
        }
      });
    }

    function deletePost(id){
      console.log("id: ", id);
      PostService.Delete(id)
      .then(function(){
        loadAllMyPosts();
      });
    }



  };

})();
