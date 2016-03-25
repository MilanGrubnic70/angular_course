'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('LandingPageController', [function() {

    }])

.controller('WaitlistController', ['$scope', '$firebase', 'FIREBASE_URL', function($scope, $firebase, FIREBASE_URL) {

    // Connect $scope.parties to live Firebase data.
    var partiesRef = new Firebase(FIREBASE_URL + 'parties');
    $scope.parties = $firebase(partiesRef);

    // Object to store data from the waitlist form.
    $scope.newParty = {
        name: '',
        phone: '',
        size: '',
        done: false,
        notified: 'No'
    };

    // Function to save a new party to the waitlist.
    $scope.saveParty = function() {
        $scope.parties.$add($scope.newParty);
        $scope.newParty = {
            name: '',
            phone: '',
            size: '',
            done: false,
            notified: 'No'
        };
    };

    // Function to sent a a text message
    $scope.sendTextMessage = function(party) {
        var textMessageRef = new Firebase(FIREBASE_URL + 'textMessages');
        var textMessages = $firebase(textMessageRef);
        var newTextMessage = {
            phoneNumber: party.phone,
            size: party.size,
            name: party.name
        };
        textMessages.$add(newTextMessage);
        party.notified = 'Yes';
        $scope.parties.$save(party.$id);
    };
}])

.controller('AuthController', ['$scope', 'authService', function($scope, authService) {
    $scope.user = { email: '', password: '' };
    $scope.register = function() {
      authService.register($scope.user);
    };
    $scope.login = function() {
        authService.login($scope.user);
    };
    $scope.logout = function() {
        authService.logout();
    };
}]);