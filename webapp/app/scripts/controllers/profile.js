'use strict';

/**
 * @ngdoc function
 * @name reforguiApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the reforguiApp
 */
angular.module('reforguiApp')
  .controller('ProfileCtrl', function ($scope, $location, $localStorage, getdataws) {

    function setInitialState() {
      $scope.toEdit = false;
      $scope.editableAddresses = false;
      $scope.editableContacts = false;
    }

    $scope.edit = function (opt) {
      $scope.toEdit = true;
      $scope.editedUser = angular.copy($scope.user);
      if (opt === 'addresses') {
        $scope.editableAddresses = true;
      }
      if (opt === 'contacts') {
        $scope.editableContacts = true;
      }
    }

    $scope.close = function () {
      setInitialState();
    }

    $scope.update = function () {
      $scope.user = angular.copy($scope.editedUser);
      setInitialState();
    }

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
      // sets the controller's initial state
      setInitialState();
	  };

    $scope.init();
  });
