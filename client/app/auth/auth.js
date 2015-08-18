var auth = angular.module('beer-tab.auth', []);

auth.controller('AuthCtrl', function ($scope, $rootScope, $window, $location, AuthService) {
  
  $scope.user = {};
  $scope.logIn = function () {
    $window.username = $scope.user.username;
    AuthService.login($scope.user)
      .then(function (token) {
        if (token === "password incorrect"){
          $scope.passwordIncorrect = true;
          //do some stuff
        } else {
          $window.localStorage.setItem('com.beer-tab', token);
          $location.path('/main');
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signUp = function () {
    AuthService.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.beer-tab', token);
        $location.path('/main');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signout = function () {
    AuthService.signout();
  };

});
