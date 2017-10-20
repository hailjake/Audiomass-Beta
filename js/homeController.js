nextGenApp.controller('homeController', function ($scope, $rootScope, $state, authService, userService) {
    $scope.scroll = 0;
        console.log('activated');

    $scope.authService = authService;
 
      // User Info
    userService.fetchUserQueue().success(function (response) {
        $scope.user = response;
    });
    
    $scope.login = function(){
        authService.facebookLogin(function(err){
           if(!err){
               authService.authenticateAndGetProfile();
           } 
        });
    };
    
    $scope.isAuthenticated = function(){
      //return localStorage.getItem('profile') !== null;
    };
    
    $scope.logoutBtn = function(){
        authService.logout();
        $state.go('home'); // go to login
    };

   
        
    
    
       if(localStorage.getItem('id_token') !== null) {
            $state.go('dashboard');
        }
    
    
    

});