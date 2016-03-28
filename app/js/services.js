'use strict';

/* Services */

angular.module('myApp.services', [])

    .value('FIREBASE_URL', 'https://waitandeat-demo-ver1.firebaseio.com/')
    // Preferred way to make a service
    // .factory('FIREBASE_URL', function() {
    //     return 'https://waitandeat-demo-ver1.firebaseio.com/';
    // });

	.factory('dataService', function ($firebase, FIREBASE_URL) {
		var dataRef =  new Firebase(FIREBASE_URL);
		var fireData = $firebase(dataRef);

		return fireData;
	})


	.factory('partyService', function(dataService){

    	var parties = dataService.$child('parties');
    	var users = dataService.$child('users');

    	var partyServiceObject = {
    		parties: parties,
    		saveParty: function (party, userId) {
				parties.$add(party);
				users.$child(userId).$child('parties').$add(party);
    		}
    	};
    	return partyServiceObject;
	})

	.factory('textMessageService', function (dataService, partyService){

        var textMessages = dataService.$child('textMessages');

        var textMessageObject = {
        	sendTextMessage: function (party) {
	        	var newTextMessage = {
		        	phoneNumber: party.phone,
		            size: party.size,
		            name: party.name
	        	};
	        	textMessages.$add(newTextMessage);
		        party.notified = 'Yes';
		        partyService.parties.$save(party.$id);
        	}
        };

        return textMessageObject;

   
	})


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
            },

            getCurrentUser: function () {
            	return auth.$getCurrentUser();
            }
        };

        $rootScope.$on("$firebaseSimpleLogin:login", function (e, user) {
        	$rootScope.currentUser = user;
        });

        $rootScope.$on("$firebaseSimpleLogin:logout", function () {
        	$rootScope.currentUser = null;
        });

        return authServiceObject;
       });