'use strict';

/**
 * @ngdoc function
 * @name reforguiApp.controller:MatchesCtrl
 * @description
 * # MatchesCtrl
 * Controller of the reforguiApp
 */
angular.module('reforguiApp')
    .controller('MatchesCtrl', function ($scope, $rootScope, $timeout, $location, $localStorage, $filter, $window, getdataws, utils) {

	$scope.user;
	$scope.active = 1;

	$scope.init = function () {
	  //window.plugins.spinnerDialog.show();
    if ($rootScope.active == -1 ) {
      $scope.active = 1;
    } else {
      $scope.active = $rootScope.active;
    }
    getdataws.retrieveReferee($localStorage.userId)
		  .success(function (data) {
		    if (data.length != 0 && data.length == 1) {
			    $scope.user = data[0];
		    }
        switch($scope.active) {
        case 0:
          $scope.showDone();
          break;
        case 1:
          $scope.showToday();
          break;
        case 2:
          $scope.showFuture();
          break;
        default:
          $scope.showToday();
        }
		  });
	};

	$scope.stripDate = function(date) {
    date = utils.getDate(date);
    return date;
	};

	$scope.stripTime = function(date) {
    date = utils.getTime(date);
    return date;
	};

	$scope.showInfo = function(match) {
    $rootScope.active = $scope.active;
	  $rootScope.match = match;
	  $location.path('/about');
	};

	$scope.showDone = function() {
	  $scope.active = 0;
	  $rootScope.active = $scope.active;
    //window.plugins.spinnerDialog.show();
	  getdataws.retrieveMatches($scope.user.name,$scope.user.surname)
		  .success(function (data) {
		    $scope.refMatches = data;

		    //console.log('lista delle partite', $scope.refMatches);
		    $timeout(function() {
			    //window.plugins.spinnerDialog.hide();
		    }, 1000);
		  })
		  .error(function (data,status) {
		    alert('ci sono stati problemi con il server, riprovare più tardi');
		    //window.plugins.spinnerDialog.hide();
		  });
	};

	$scope.showToday = function() {
    $window.scrollTo(0,0);
    $scope.active = 1;
	  $rootScope.active = $scope.active;
    //window.plugins.spinnerDialog.show();
    var date = new Date();
	  date.setHours(0,0,0,0);
	  $scope.date = $filter('date')(date,'yyyy-MM-dd HH:mm');
	  getdataws.retrieveMatches($scope.user.name,$scope.user.surname,$scope.date)
		  .success(function (data) {
		    $scope.refMatches = data;

		    $timeout(function() {
			    //window.plugins.spinnerDialog.hide();
		    }, 1000);
		  })
		  .error(function (data,status) {
		    alert('ci sono stati problemi con il server, riprovare più tardi');
		    //window.plugins.spinnerDialog.hide();
		  });
	};

	$scope.showFuture = function() {
    $window.scrollTo(0,0);
    $scope.active = 2;
	  $rootScope.active = $scope.active;
    //window.plugins.spinnerDialog.show();
	  var startdate = new Date();
    startdate.setHours(0,0,0,0);
	  $scope.start = $filter('date')(startdate,'yyyy-MM-dd HH:mm');
	  var enddate = new Date();
	  enddate.setHours(0,0,0,0);
	  enddate.setDate(enddate.getDate() + 30);
	  $scope.end = $filter('date')(enddate,'yyyy-MM-dd HH:mm');
	  getdataws.retrieveMatches($scope.user.name,$scope.user.surname,$scope.start,$scope.end)
		  .success(function (data) {
		    $scope.refMatches = data;

		      //console.log('lista delle partite', $scope.refMatches);
		    $timeout(function() {
			//window.plugins.spinnerDialog.hide();
		    }, 1000);
		  })
		  .error(function (data,status) {
		    alert('ci sono stati problemi con il server, riprovare più tardi');
		    //window.plugins.spinnerDialog.hide();
		  });
	};

	$scope.swipeRight = function() {
	  if ($scope.active > 0) {
		  $scope.active--;

		  switch($scope.active) {
		  case 0:
		    $scope.showDone();
		    break;
		  case 1:
		    $scope.showToday();
		    break;
		  case 2:
		    $scope.showFuture();
		    break;
		  }
	  }
	};

	$scope.swipeLeft = function() {
	  if ($scope.active < 2) {
		  $scope.active++;

		  switch($scope.active) {
		  case 0:
		    $scope.showDone();
		    break;
		  case 1:
		    $scope.showToday();
		    break;
		  case 2:
		    $scope.showFuture();
		    break;
		  }
	  }
	};

  $scope.init();

});
