nextGenApp.controller('profileController', function ($scope, $state, spotlightService, $http, $rootScope, $localStorage) {

    // User Info
    spotlightService.fetchUserSpotlight().success(function (response) {
        $scope.artistResult = response;

    });
        $scope.artist = $localStorage.artistProfileInfo = $localStorage.artistProfileInfo || [];



    
      // Open Dates
    $scope.lookupDates = function (artist) {

        $http.get('http://api.songkick.com/api/3.0/artists/' + artist.event.uri + '/calendar.json?apikey=jwzmbEyCAIwD7HCy').success(function (data) {
            $scope.tourDates = data;
            
            artist.dateToggle = true;

        });

    };
    // Close Dates
    $scope.closeDates = function(artist){
        artist.dateToggle = false;

    };
    
    
    $scope.addToQueue = function (item) {
        item.$$hashKey = null;
        var blendedQueue = $.unique([].concat(
            $.map($localStorage.selectedItems, function (p) {
                p.$$hashKey = null;
                return p;
            }), [item]
        ));


        $localStorage.selectedItems = blendedQueue;

        $rootScope.$broadcast('addSongFromQueue', item.event.uri);
    };
    // youtube player controls
    $scope.playerVars = {
        controls: 1,
        autoplay: 0
    };

    // when playing
    $scope.isPlayingVideo = function (card) {
        return $scope.currentlyPlayingVideo == card.event.uri;
    };

    $scope.playVideo = function (card) {
        $scope.currentlyPlayingVideo = card.event.uri;
    };
    // closing video
    $scope.closeVideo = function () {
        $scope.currentlyPlayingVideo = null;
    };

    // on video ending
    $scope.$on('youtube.player.ended', function ($event, player) {
        player.stopVideo();
        $scope.closeVideo();
    });


});