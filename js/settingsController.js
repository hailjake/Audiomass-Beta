nextGenApp.controller('settingsController', function ($scope, $state, userService) {

    // User Info
    userService.fetchUserQueue().success(function (response) {
        $scope.user = response;
    });

    // load data on page load
    $scope.$on('$viewContentLoaded', function () {
        //componentHandler.upgradeDom(); 
    });
});