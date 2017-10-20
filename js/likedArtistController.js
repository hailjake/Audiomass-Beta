nextGenApp.controller('likedArtistController', function ($scope, $localStorage, $state) {

    $scope.$storage = $localStorage;

    // load data on page load
    $scope.$on('$viewContentLoaded', function () {
        $scope.likedArtist = $localStorage.likedArtist;

    });

    $scope.unlikeArtist = function (item) {
        $localStorage.likedArtist.splice($localStorage.likedArtist.indexOf(item), 1);
    };
    
    
    $localStorage.artistProfileInfo = $localStorage.artistProfileInfo || [];

    $scope.artistProfileLnk = function (artist) {
        $localStorage.artistProfileInfo = [artist];
        $state.go('dashboard.profile');
    };


});