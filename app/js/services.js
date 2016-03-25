'use strict';

/* Services */

angular.module('myApp.services', [])

    .value('FIREBASE_URL', 'https://waitandeat-demo-ver1.firebaseio.com/')
    // Preferred way to make a service
    // .factory('FIREBASE_URL', function() {
    //     return 'https://waitandeat-demo-ver1.firebaseio.com/';
    // });

	.factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL) {
		var authRef = new Firebase(FIREBASE_URL);
    	var auth = $firebaseSimpleLogin(authRef);

        var authServiceObject = {
        	register: function (user) {
        		auth.$createUser(user.email, user.password)
		            .then(function(data) {
                console.log(data);
                authServiceObject.login(user);
            });
        	},
            login: function(user) {
                auth.$login('password', user)
                    .then(function(data) {
                            console.log(data);
                            $location.path('/waitlist');
                        });
                    },
            logout: function () {
            	   		auth.$logout();
       				 	$location.path('/');
            }
        };

        $rootScope.$on("firebaseSimpleLogin:login", function (e, user) {
        	$rootScope.currentUser = user;
        });

        $rootScope.$on("firebaseSimpleLogout:login", function () {
        	$rootScope.currentUser = null;
        });

        return authServiceObject;
       });