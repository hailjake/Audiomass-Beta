nextGenApp.controller('queueController', function ($scope, $localStorage, $sessionStorage, $rootScope, $timeout) {


    // load data on page load
    $scope.$on('$viewContentLoaded', function () {
        $scope.playlist = $localStorage.selectedItems;

    });
    


    //Like Artist
    $localStorage.likedArtist = $localStorage.likedArtist || [];

    $scope.alreadyLiked = false;

    $scope.like = function (item) {

        if (!~$localStorage.likedArtist.indexOf(item)) {
            $localStorage.likedArtist.push(item);
            console.log(item.id);
        } else {
            $scope.alreadyLiked = true;
        }
        $timeout(function () {

            $scope.alreadyLiked = false;
        }, 3000);


    };

    $scope.removeFromQueue = function (item) {
        $localStorage.selectedItems.splice($localStorage.selectedItems.indexOf(item), 1);
    };

    $scope.currentSong = "";

    // Add to Queue / Play Song
    $scope.playSong = function (item) {
        $scope.currentSong = item;
        var blendedQueue = $.unique([].concat([item],
            $.map($localStorage.selectedItems, function (p) {
                return p;
            })
        ));

        var newQueue = $.map(blendedQueue, function (p) {
            return p.event.uri;
        });

        $localStorage.selectedItems = blendedQueue;
        $scope.playlist = blendedQueue;

        $rootScope.$broadcast('playSongFromQueue', newQueue);
        $('.snackbar-player').addClass('now-playing');

    };
        $sessionStorage.currentSong = $sessionStorage.currentSong || "";
    $scope.currentSong = $sessionStorage.currentSong;

    $scope.pauseFromCard = function(){
        $rootScope.$broadcast('pauseSongFromQueue');
        $scope.currentSong = "";
        $sessionStorage.currentSong = "";

    };

});
