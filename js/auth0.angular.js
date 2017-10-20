nextGenApp.service('angularAuth0', function ($rootScope) {
      var Auth0Js = new Auth0({
        domain: window.AUTH0_DOMAIN,
        clientID: window.AUTH0_CLIENT_ID,
        callbackURL: window.AUTH0_CALLBACK_URL,
        responseMode: this.responseMode,
        responseType: this.responseType
      });
      var auth0 = {};
      var functions = [];
      for (var i in Auth0Js) {
        if (angular.isFunction(Auth0Js[i])) {
          functions.push(i);
        }
      }

      function wrapArguments(parameters) {
        var lastIndex = parameters.length - 1,
          func = parameters[lastIndex];
        if (angular.isFunction(func)) {
          parameters[lastIndex] = function() {
            var args = arguments;
            $rootScope.$evalAsync(function() {
              func.apply(Auth0Js, args);
            });
          };
        }
        return parameters;
      }

      for (var i = 0; i < functions.length; i++) {
        auth0[functions[i]] = (function(name) {
          var customFunction = function() {
            return Auth0Js[name].apply(Auth0Js, wrapArguments(arguments));
          };
          return customFunction;
        })(functions[i]);
      }
      return auth0;
});