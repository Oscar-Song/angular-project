(function () {
  'use strict';

  angular
  .module('app')
  .controller('RegisterController', RegisterController)
  .directive('pwCheck', pwCheck);

  RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
  function RegisterController(UserService, $location, $rootScope, FlashService) {
    var vm = this;

    vm.register = register;

    function register() {
      vm.dataLoading = true;
      UserService.Create(vm.user)
      .then(function (response) {
        if (response.success) {
          FlashService.Success('Registration successful', true);
          $location.path('/login');
        } else {
          FlashService.Error(response.message);
          vm.dataLoading = false;
        }
      });
    }
  };

  function pwCheck(){
    return {
      require : 'ngModel',
      scope : {
        newPassword: '=match'
      },
      link:function(scope, element, attrs, ngModel){
        scope.$watch('newPassword', function(){
          ngModel.$setValidity('matchError', element.val() === scope.newPassword);
        })
        element.on('keyup', function(){
          scope.$apply(function(){
            ngModel.$setValidity('matchError', element.val() === scope.newPassword);
          })
        })
      }
    }
  }

})();
