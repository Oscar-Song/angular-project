(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['currentUser', 'isUserAdmin', 'UserService'];
    function HomeController(currentUser, isUserAdmin, UserService) {
        var vm = this;

        vm.user = currentUser;
        vm.isUserAdmin = isUserAdmin(vm.user.username);
    };

})();
