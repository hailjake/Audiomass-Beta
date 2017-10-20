nextGenApp.service('authService', function (lock, authManager, angularAuth0, $state) {

    function login() {
        lock.show();
    }

    function logout() {
        localStorage.removeItem('id_token');
        authManager.unauthenticate();
    }


    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
        lock.on('authenticated', function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            authManager.authenticate();

        });
    }

    function facebookLogin(callback) {
        angularAuth0.login({
            connection: 'facebook',
            responseType: 'token'
        }, callback);
    }

    function authenticateAndGetProfile() {
      var result = angularAuth0.parseHash(window.location.hash);

      if (result && result.idToken) {
        localStorage.setItem('id_token', result.idToken);
        authManager.authenticate();
        angularAuth0.getProfile(result.idToken, function (error, profileData) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profileData));
          $state.go('dashboard');
        });
      } else if (result && result.error) {
        alert('error: ' + result.error);
      }
    }
    
    return {
        login: login,
        facebookLogin: facebookLogin,
        authenticateAndGetProfile: authenticateAndGetProfile,
        registerAuthenticationListener: registerAuthenticationListener,
        logout: logout
    };
});