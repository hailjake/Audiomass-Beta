nextGenApp.controller('dashboardController', function ($scope, $state, $sessionStorage, userService) {
  $scope.scroll = 0;

    
        angular.element(document).ready(function () {

        $sessionStorage.currentSong = "";

    });
    
    
    // User Info
    userService.fetchUserQueue().success(function (response) {
        $scope.user = response;
    });
       if(localStorage.getItem('id_token') === null) {
            $state.go('dashboard');
        }

});