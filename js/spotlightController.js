nextGenApp.controller('spotlightController', function ($scope, $sessionStorage, $localStorage, $rootScope, spotlightService, $timeout, $http) {
    // All User Data
    $scope.$storage = $localStorage;
    $scope.dateToggle = null;

    // load data on page load
    $scope.$on('$locationChangeSuccess', function () {
       $timeout(function () {
        componentHandler.upgradeDom(); 
        }, 500);

    });

    // User Info
    spotlightService.fetchUserSpotlight().success(function (response) {

        $scope.spotlightResult = response;

    });
    // Open Dates
    $scope.lookupDates = function (artist) {

        $http.get('https://api.songkick.com/api/3.0/artists/' + artist.event.uri + '/calendar.json?apikey=jwzmbEyCAIwD7HCy').success(function (data) {
            $scope.tourDates = data;

            artist.dateToggle = true;

        });

    };
    // Close Dates
    $scope.closeDates = function (artist) {
        artist.dateToggle = false;
    };

    $localStorage.selectedItems = $localStorage.selectedItems || [];

    $localStorage.likedArtist = $localStorage.likedArtist || [];
    $sessionStorage.currentSong = $sessionStorage.currentSong || "";

    $scope.alreadyLiked = false;

    $scope.currentlyPlayingVideo = null;

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
    $scope.currentlyPlayingVideo = "";
    // when playing
    $scope.isPlayingVideo = function (card) {
        return $scope.currentlyPlayingVideo === card.event.uri;
    };

    /**$scope.playVideo = function (card) {
        $scope.currentlyPlayingVideo = card.event.uri;
    };**/



    $scope.playVideo = function (card) {
        $('#youtube-player').addClass("show-modal");
        $scope.currentlyPlayingVideo = card.event.uri;
    };

    // closing video
    $scope.closeVideo = function () {
        $scope.currentlyPlayingVideo = null;
        $('#youtube-player').removeClass("show-modal");

    };

    // on video ending
    $scope.$on('youtube.player.ended', function ($event, player) {
        player.stopVideo();
        $scope.closeVideo();
    });

    
    
    // bands in town
    

    $scope.showDates = function (artist) {
        $('#tourdate-modal').addClass("show-modal");
        
          $http.get('https://api.songkick.com/api/3.0/artists/' + artist.event.uri + '/calendar.json?apikey=jwzmbEyCAIwD7HCy').success(function (data) {
            $scope.tourDates = data;

        });
    };

    // closing video
    $scope.closeDates = function () {
        $('#tourdate-modal').removeClass("show-modal");
    };
    
    $scope.currentSong = $sessionStorage.currentSong;
    
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
        
        $sessionStorage.currentSong = item;

    };
    $scope.pauseFromCard = function(){
        $rootScope.$broadcast('pauseSongFromQueue');
        $scope.currentSong = "";
        $sessionStorage.currentSong = "";

    };
});