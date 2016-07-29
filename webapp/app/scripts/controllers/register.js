'use strict';

/**
 * @ngdoc function
 * @name reforguiApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the reforguiApp
 */
angular.module('reforguiApp')
  .controller('RegisterCtrl', function ($scope, $location, $localStorage, getdataws) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //creo l'oggetto referee da passare poi al ws
    /*
    "name": "Luca",
	"surname": "Canali",
	"fullname": "CANALI LUCA",
	"id_ref": 46726,
	"indirizzo": "Via Campone 37 - Gandino(BG)",
	"mail": "luca.canali93@virgilio.it",
	"id": 5
    */
    $scope.user = {
    	id_ref: null,
        name: null,
    	surname: null,
    	fullname: null,
    	address: null,
    	mail: null,
    	id: null
    };

      $scope.temp = {
	  city: null,
	  state: null
      };

      $scope.registerRef = function () {

	  $scope.user.fullname = $scope.user.surname + ' ' + $scope.user.name;
	  $scope.user.address = $scope.user.address + ' - ' + $scope.temp.city + ' (' + $scope.temp.state + ')';
	  //verifichiamo se l'arbitro esiste già
	  console.log('oggetto creato dopo la compilazione del form',$scope.user);
	  getdataws.retrieveReferee($scope.user.id_ref)
              .success(function (data) {
		  //se esiste allora non serve ricrearlo, altrimenti lo si crea.
		  if (data.length != 0 && data.length == 1) {
		      $scope.user = data[0];
		      console.log('esiste già', $scope.user);
		  } else {
		      getdataws.createReferee($scope.user)
			  .success(function (data) {
			      //per ora non faccio nulla, ma in seguito dovrò recuperare l'oggetto restituito in risposta.
			  }).
			  error(function (data,status) {
			      alert('ci sono stati problemi con il server, riprovare più tardi');
			  });
		  }
              });
    	  $localStorage.userId = $scope.user.id_ref;
    	  $location.path( '/' );
      };

  });
