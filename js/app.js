var nextGenApp = angular.module('nextGenApp', ['ngResource', 'ui.router', 'auth0.lock', 'angular-jwt', 'ngStorage', 'ngAnimate', 'plangular', 'youtube-embed'])
    .run(run);

run.$inject = ['$rootScope', 'authService', 'lock'];

function run($rootScope, authService, lock) {
    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    $rootScope.authService = authService;

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    // Register the synchronous hash parser
    // when using UI Router
    lock.interceptHash();
    
    //Try and fetch. If success, then go to dashboard
    authService.authenticateAndGetProfile();
}