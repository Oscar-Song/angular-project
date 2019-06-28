(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['currentUser', 'allUsers', 'UserService'];
    function HomeController(currentUser, allUsers, UserService) {
        var vm = this;

        vm.user = currentUser;
        vm.allUsers = allUsers;
        vm.deleteUser = deleteUser;
        //console.log("HomeController: ", currentUser);

        // initController();
        //
        // function initController() {
        //     loadCurrentUser();
        //     loadAllUsers();
        // }
        //
        // function loadCurrentUser() {
        //     UserService.GetByUsername($rootScope.globals.currentUser.username)
        //         .then(function (user) {
        //             vm.user = user;
        //         });
        // }
        //
        // function loadAllUsers() {
        //     UserService.GetAll()
        //         .then(function (users) {
        //             vm.allUsers = users;
        //         });
        // }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

    };

})();
