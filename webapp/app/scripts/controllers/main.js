'use strict';

/**
 * @ngdoc function
 * @name reforguiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reforguiApp
 */
angular.module('reforguiApp')
  .controller('MainCtrl', function ($scope, $location, $localStorage, getdataws, Carousel) {

    $scope.toConfirm = [];
    $scope.toConfirm.push('NAZIONALE A2/F 4448 1:A.VIGATO 2:S.CANALI PFF GROUP FERRARA/MAGIKA CASTEL SAN PIETRO TERME 07/05/2016 21:00 PALA HILTON PHARMA P.le Atleti Azzurri d\'Italia 44124 FERRARA (FE)');
    $scope.toConfirm.push('CR LOMBARDIA C2 14139 1:N.MONGELLI 2:S.CANALI VIRTUS PALL. GORLE/ARDOR BOLLATE 25/05/2016 21:00 Palazzetto Via Roma 2 24020 GORLE (BG)');
    $scope.toConfirm.push('CP BERGAMO PROM.MASCH. 7139 1:L.CANALI 2:S.CANALI LA TORRE/BASKET CARAVAGGIO 23/05/2016 21:00 Palazzetto Via Milano 23 24020 TORRE BOLDONE (BG)');
    console.log('che array ho qua: ', $scope.toConfirm);

	  $scope.init = function () {
      // initializing the pending confirmation slider
      $scope.Carousel = Carousel;

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
