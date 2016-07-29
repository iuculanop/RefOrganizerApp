'use strict';

/**
 * @ngdoc function
 * @name reforguiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reforguiApp
 */
angular.module('reforguiApp')
    .controller('AboutCtrl', function ($scope, $rootScope, $timeout, $window, getdataws) {

      $scope.awesomeThings = [
	      'HTML5 Boilerplate',
	      'AngularJS',
	      'Karma'
	    ];

	    $scope.coords = [];
	    $scope.readyToSend = false;

	    $scope.checkDate = function(matchdate) {
	      var dtnow = Date.now();
	      var dtmatch = Date.parse(matchdate);
	      if (dtnow > dtmatch) {
		      return true;
	      } else {
		      return false;
	      }
	    };

	    $scope.display = function () {
        $window.scrollTo(0,0);
        $scope.toEdit = false;
	      $scope.match = $rootScope.match;
        $scope.readyToSend = !$scope.match.isSent;
	      $timeout(function(){
		      var addr = $scope.match.address;
		      var latlng = new google.maps.LatLng(-34.397, 150.644);
		      var geocoder = new google.maps.Geocoder();
		      var myOptions = {
		        zoom: 15,
		        center: latlng,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		      };

          $scope.map = new google.maps.Map(document.getElementById("map"), myOptions);
		      if (geocoder) {
		        geocoder.geocode({
			          'address': addr
		        }, function(results, status) {
			        if (status == google.maps.GeocoderStatus.OK) {
			          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
				          $scope.map.setCenter(results[0].geometry.location);
				          /* 
				           https://developers.google.com/maps/documentation/javascript/geocoding
				           ATTENZIONE: Mai recuperare i valori ricostruendo le chiavi del json, conviene sempre 
				           appoggiarsi alle api javascript di Google.(vedi link sopra)
				           */
				          $scope.coords = [results[0].geometry.location.lat(),
						      results[0].geometry.location.lng()]; 
				          console.log('coordinate rilevate:',$scope.coords);

				          var infowindow = new google.maps.InfoWindow({
				              content: '<b>' + addr + '</b>',
				              size: new google.maps.Size(150, 50)
				          });

				          var marker = new google.maps.Marker({
				              position: results[0].geometry.location,
				              map: $scope.map,
				              title: addr
				          });
				          google.maps.event.addListener(marker, 'click', function() {
				            infowindow.open(map, marker);
				          });
			          } else {
				          alert('No results found');
			          }
			        } else {
			          alert('Geocode was not successful for the following reason: ' + status);
			        }
		        });
		      }
        },200);
	    };

	    $scope.edit = function() {
	      $scope.toEdit = true;
	      $scope.copymatch = angular.copy($scope.match);
	    };

	    $scope.update = function() {
	      console.log($scope.match);
	      getdataws.updateMatch($scope.copymatch)
		      .success(function (data) {
		        $scope.readyToSend = true;
		        $scope.toEdit = false;
		        $scope.match = $scope.copymatch;
		      })
		      .error(function (data,status) {
		        alert('ci sono stati problemi con il server, riprovare più tardi');
		      });
	    };

	    $scope.navigate = function() {
	      launchnavigator.navigate(
		      $scope.coords,
		      null,
		      function() {},
		      function(error) {
		        alert('Plugin error:'+ error);
		      }
	      );
	    };

	    $scope.display();

    });
