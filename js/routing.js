nextGenApp.config(function ($stateProvider, lockProvider, $urlRouterProvider) {   
    lockProvider.init({
      clientID: 'Rt5TjMRM3CikPbGTUzPBd8Gj3ElGShWa',
      domain: 'alphaxgroup.auth0.com'
        
    });
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
    // Main Index
    .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'homeController'
    })

    // Main Dashboard View
    .state('dashboard', {

            url: '/dashboard',
            templateUrl: 'dashboard.html',
            controller: 'dashboardController',
            redirectTo: 'dashboard.spotlight'

        })
        //** Dashboard Sub States **// 
    
        //Spotlight
        .state('dashboard.spotlight', {
            url: '/spotlight',
            templateUrl: 'partial-spotlight.html',
            controller: 'spotlightController'
        })
            //Likes
        .state('dashboard.queue', {
            url: '/playlist',
            templateUrl: 'partial-queue.html',
            controller: 'queueController'
        })
        //Likes
        .state('dashboard.likes', {
            url: '/likes',
            templateUrl: 'partial-likes.html',
             controller: 'likedArtistController'

        })
    
        //Profile
        .state('dashboard.profile', {
            url: '/profile',
            templateUrl: 'partial-profile.html',
            controller: 'profileController'
        }) 
        //Settings
        .state('dashboard.settings', {
            url: '/settings',
            templateUrl: 'partial-settings.html',
            controller: 'settingsController'
        });

});


nextGenApp.config(function(plangularConfigProvider){
    plangularConfigProvider.clientId = '5fca14d636753593fdcc411524419915';
});

// show hide nav items based on state
nextGenApp.run(function ($state, $rootScope) {
    $rootScope.$state = $state;

});


// To redirect nested states
nextGenApp.run(['$rootScope', '$state', function ($rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function (evt, to, params) {
        if (to.redirectTo) {
            evt.preventDefault();
            $state.go(to.redirectTo, params, {
                location: 'replace'
            });
        }

    });
    
    $rootScope.$on('$stateChangeSuccess', function() {
       document.body.scrollTop = document.documentElement.scrollTop = 0;


    });
    
    
}]);


nextGenApp.factory("userService", ['$http',function($http){  
    var obj = {};
    
    obj.fetchUserQueue = function(){ 
        //return $http.get('user.json');
            return {
                success : function(callback){
                     callback([JSON.parse(localStorage.getItem('profile'))]);
                }
            }
    };

 return obj;

}]);


nextGenApp.factory("spotlightService", ['$http',function($http){  
    var obj = {};
    
    obj.fetchUserSpotlight = function(){ 
        return $http.get('spotlight.json');
    };

 return obj;

}]);
    
    
    
    


