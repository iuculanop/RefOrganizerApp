'use strict';

/**
 * @ngdoc function
 * @name reforguiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reforguiApp
 */
angular.module('reforguiApp')
    .controller('MainCtrl', function ($scope, $location, $localStorage, getdataws) {
	$scope.awesomeThings = [
	    'HTML5 Boilerplate',
	    'AngularJS',
	    'Karma'
	];


	$scope.init = function () {
    	    // check if there are already some data stored on phone or not

    	    if ($localStorage.userId != null) {
    		$scope.user = $localStorage.userId;
		getdataws.retrieveReferee($localStorage.userId)
		    .success(function (data) {
			if (data.length != 0 && data.length == 1) {
			    $scope.user = data[0];
			}
		    });   
    		console.log('sei qui!', $localStorage.userId);
    	    } else {
    		console.log('sei qui!', $localStorage.userId);
    		$location.path( '/register' );
    	    }
	};

	$scope.goBack = function () {
	    window.history.back();
	};

	$scope.init();

    });
