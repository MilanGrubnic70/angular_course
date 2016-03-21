'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('LandingPageController', [function() {

    }])

.controller('WaitlistController', ['$scope', '$firebase', function($scope, $firebase) {

    var partiesRef = new Firebase('https://waitandeat-demo-ver1.firebaseio.com/parties');

    $scope.parties = $firebase(partiesRef);

    $scope.newParty = {
        name: '',
        phone: '',
        size: ''
    };

    $scope.saveParty = function() {
        $scope.parties.$add($scope.newParty);
        $scope.newParty = {
            name: '',
            phone: '',
            size: ''
        };
    };

    // Function to sent a a text message
    $scope.sendTextMessage = function(phoneNumber) {
        var textMessageRef = new Firebase('http://waitandeat-demo-ver1.firebaseio.com/textMessages');
        var textMessages = $firebase(textMessageRef);
        textMessages.$add({ phoneNumber: phoneNumber });
    };
}])