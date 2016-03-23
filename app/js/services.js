'use strict';

/* Services */

angular.module('myApp.services', [])
    // .value('FIREBASE_URL', 'https://waitandeat-demo-ver1.firebaseio.com/');
    // Preferred way to make a service
    .factory('FIREBASE_URL', function () {
    	return 'https://waitandeat-demo-ver1.firebaseio.com/';
    });