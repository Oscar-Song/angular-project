(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.saveUserQuote = saveUserQuote;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
          console.log("entered delete");
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

        function saveUserQuote(){
          console.log("entered function");
          console.log(vm.user);
          UserService.Update(vm.user)
          .then(function(){
            loadAllUsers();
          });
        }
    }

})();
