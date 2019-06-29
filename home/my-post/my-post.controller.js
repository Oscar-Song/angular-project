(function(){
  'use strict';

  angular.module('app')
  .controller('MyPostController', MyPostController);

  MyPostController.$inject = ['currentUser', 'PostService', 'FlashService', '$state'];
  function MyPostController(currentUser, PostService, FlashService, $state){
    var vm = this;

    vm.allMyPosts = null;

    vm.createPost = createPost;
    vm.getPost    = getPost;
    vm.updatePost = updatePost;
    vm.deletePost = deletePost;
    vm.resetPost = resetPost;

    initController();

    function initController(){
      resetPost();
      loadAllMyPosts();
    }

    function loadAllMyPosts(){
      PostService.GetAllPostsByUser(currentUser.username)
        .then(function(posts){
          vm.allMyPosts = posts;
        })
    }

    function resetPost(){
      vm.post = {
        username: currentUser.username,
        type: currentUser.status,
        name: currentUser.firstName + " " + currentUser.lastName
      };
    }

    function createPost(){
      vm.dataLoading = true;
      //Create timestamp
      vm.post.timestamp = Date.now();
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

    function getPost(id){
      PostService.GetPostById(id)
      .then(function(post){
        vm.post = post;
      });
    }

    function updatePost(){
      PostService.Update(vm.post)
      .then(function() {
        FlashService.Success('Post updated', true);
        loadAllMyPosts();
        $state.go('app.my-post.list-posts');
      })
    }

    function deletePost(id){
      PostService.Delete(id)
      .then(function(){
        loadAllMyPosts();
      });
    }
  };

})();
