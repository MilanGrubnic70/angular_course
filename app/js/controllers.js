'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('LandingPageController', [function() {

    }])

.controller('WaitlistController', ['$scope', '$firebase', function($scope, $firebase) {

    // Connect $scope.parties to live Firebase data.
    var partiesRef = new Firebase('https://waitandeat-demo-ver1.firebaseio.com/parties');
    $scope.parties = $firebase(partiesRef);

    // Object to store data from the waitlist form.
    $scope.newParty = {
        name: '',
        phone: '',
        size: ''
    };

    // Function to save a new party to the waitlist.
    $scope.saveParty = function() {
        $scope.parties.$add($scope.newParty);
        $scope.newParty = {
            name: '',
            phone: '',
            size: ''
        };
    };

    // Function to sent a a text message
    $scope.sendTextMessage = function(party) {
        var textMessageRef = new Firebase('http://waitandeat-demo-ver1.firebaseio.com/textMessages');
        var textMessages = $firebase(textMessageRef);
        var newTextMessage = {
            phoneNumber: party.phone,
            size: party.size,
            name: party.name
        };
        textMessages.$add({ phoneNumber: phoneNumber });
    };
}])