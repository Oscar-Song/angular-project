(function(){
  'use strict';

  angular
  .module('app')
  .factory('PostService', PostService);

  PostService.$inject = ['$timeout', '$filter', '$q'];
  function PostService($timeout, $filter, $q){
    var service = {};

    service.GetAllPosts = GetAllPosts;
    service.GetAllPostsByUser = GetPostsByUser;
    service.GetPostById = GetPostById;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAllPosts(type){
      var deferred = $q.defer();
      var filteredPosts = $filter('filter')(getPosts(), {type: type});
      deferred.resolve(filteredPosts);
      return deferred.promise;
    }

    function GetPostsByUser(username){
      var deferred = $q.defer();
      var filteredPosts = $filter('filter')(getPosts(), { username: username });
      deferred.resolve(filteredPosts);
      return deferred.promise;
    }

    function GetPostById(id){
      var deferred = $q.defer();
      var filtered = $filter('filter')(getPosts(), {id: id});
      var post = filtered.length ? filtered[0] : null;
      deferred.resolve(post);
      return deferred.promise;
    }

    function Create(post){
      var deferred = $q.defer();

      $timeout(function () {
        GetPostsByUser(post.username)
        .then(function(posts){
          if(posts.length >= 5){
            deferred.resolve({success: false, message: 'Exceeded maximum allowed posts. Allowed # of posts per user: 5'});
          } else{
            var posts = getPosts();

            //assign id
            var lastPost = posts[posts.length - 1] || { id: 0 };
            post.id = lastPost.id + 1;

            //save to local storage
            posts.push(post);
            setPosts(posts);

            deferred.resolve({ success: true});
          }
        });
      }, 1000);

      return deferred.promise;
    }

    function Update(post){
      var deferred = $q.defer();

      var posts = getPosts();
      for(var i = 0; i < posts.length; i++){
        if(posts[i].id === post.id){
          posts[i] = post;
          break;
        }
      }
      setPosts(posts);
      deferred.resolve();

      return deferred.promise;
    }

    function Delete(id){
      var deferred = $q.defer();

      var posts = getPosts();
      for( var i = 0; i < posts.length; i++){
        var post = posts[i];
        if(post.id === id){
          posts.splice(i,1);
          break;
        }
      }
      setPosts(posts);
      deferred.resolve();

      return deferred.promise;
    }



    // private functions
    function getPosts() {
      if(!localStorage.posts){
        localStorage.posts = JSON.stringify([]);
      }

      return JSON.parse(localStorage.posts);
    }

    function setPosts(posts) {
      localStorage.posts = JSON.stringify(posts);
    }
  }
})();
