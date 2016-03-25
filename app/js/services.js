'use strict';

/* Services */

angular.module('myApp.services', [])
    // .value('FIREBASE_URL', 'https://waitandeat-demo-ver1.firebaseio.com/');
    // Preferred way to make a service
    .factory('FIREBASE_URL', function() {
        return 'https://waitandeat-demo-ver1.firebaseio.com/';
    });

	.factory('authService', function($firebaseSimpleLogin, $location, FIREBASE_URL) {
		var authRef = new Firebase(FIREBASE_URL);
    	var auth = $firebaseSimpleLogin(authRef);

        return {
            login: function(user) {
                auth.$login('password', user)
                    .then(function(data) {
                            console.log(data);
                            $location.path('/waitlist');
                        });
                    };
                };
        });