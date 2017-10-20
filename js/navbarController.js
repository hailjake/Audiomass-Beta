angular.module('nextGenApp')

    .controller('NavbarCtrl', function ($scope, $rootScope, $state, authService, userService) {

        // TODO: Angularfy
        $('#toggleLight').click(function () {
            $('#bulb').toggleClass('bulbOn');
            $('body').toggleClass('white-theme');
        });

        // User Info
        userService.fetchUserQueue().success(function (response) {
            $scope.user = response;
        });

        $scope.login = function () {
            authService.facebookLogin(function (err) {
                if (!err) {
                    authService.authenticateAndGetProfile();
                }
            });
        };

        $scope.isAuthenticated = function () {
            //return localStorage.getItem('profile') !== null;
        };

        $scope.logoutBtn = function () {
            authService.logout();
            $state.go('home'); // go to login
        };

        $scope.currentSong = '';

        $rootScope.$on("playSongFromQueue", function (evt, data) {

            $scope.currentSong = data;

            //document.getElementById('scPlayer').contentWindow.location.reload(true);


        });



    });
