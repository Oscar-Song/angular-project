(function(){
  'use strict';

  angular.module('app')
  .controller('AllUsersController', AllUsersController);

  AllUsersController.$inject = ['allUsers', 'isUserAdmin', 'UserService'];
  function AllUsersController(allUsers, isUserAdmin, UserService){
    var vm = this;

    vm.allUsers = allUsers;
    vm.isUserAdmin = isUserAdmin;
    vm.deleteUser = deleteUser;

    function loadAllUsers() {
        UserService.GetAll()
            .then(function (users) {
                vm.allUsers = users;
            });
    }

    function deleteUser(id) {
        UserService.Delete(id)
        .then(function () {
            loadAllUsers();
        });
    }
  }
})();
