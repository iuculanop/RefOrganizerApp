'use strict';

/**
 * @ngdoc overview
 * @name reforguiApp
 * @description
 * # reforguiApp
 *
 * Main module of the application.
 */
angular
  .module('reforguiApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngDialog',
    'ngTouch',
    'ngStorage',
    'angular-carousel'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/matches/', {
        templateUrl: 'views/matches.html',
        controller: 'MatchesCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(["$rootScope", "smsReceiver", function($rootScope, smsReceiver) {
    // setting global variables
    $rootScope.smsList=[];
    // checking the permissions - for android 23 or up
    cordova.plugins.diagnostic.getPermissionAuthorizationStatus(function(status){
      switch(status){
      case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
        console.log("Permission granted to receive sms");
        break;
      case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
        console.log("Permission to receive sms has not been requested yet");
        requestPermission(cordova.plugins.diagnostic.runtimePermission.RECEIVE_SMS);
        break;
      case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
        console.log("Permission denied to receive sms - ask again?");
        break;
      case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
        console.log("Permission permanently denied to receive sms - guess we won't be using it then!");
        break;
      }
    }, function(error){
      console.error("The following error occurred: "+error);
    }, cordova.plugins.diagnostic.runtimePermission.RECEIVE_SMS);

    cordova.plugins.diagnostic.getPermissionAuthorizationStatus(function(status){
      switch(status){
      case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
        console.log("Permission granted to read sms");
        break;
      case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
        console.log("Permission to read sms has not been requested yet");
        requestPermission(cordova.plugins.diagnostic.runtimePermission.READ_SMS);
        break;
      case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
        console.log("Permission denied to read sms - ask again?");
        break;
      case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
        console.log("Permission permanently denied to read sms - guess we won't be using it then!");
        break;
      }
    }, function(error){
      console.error("The following error occurred: "+error);
    }, cordova.plugins.diagnostic.runtimePermission.READ_SMS);

    // check if the sms plugin is ready
    if ( SMS === undefined ) { alert( 'SMS plugin not ready' ); return; }
    // starting the sms watch daemon
    if(SMS) SMS.startWatch(function(){
      console.log('in attesa di messaggio...');
    }, function(){
      console.log('impossibile avviare il demone');
    });
    // setting the event onSMSArrive
    document.addEventListener("onSMSArrive", processSMS);

    function processSMS(e) {
      var data = e.data;
      $rootScope.$apply(function() {
        console.log('SMS received: '+ JSON.stringify(data,null,10));
        if (data.address === '+3934493248' || data.address === '+393471896070') {
          console.log('messaggio da ehiweb da confermare');
          smsReceiver.add(data.body);
          console.log('messaggio inserito');
        }
      });
    }

    function requestPermission(type) {
      cordova.plugins.diagnostic.requestRuntimePermission(function(status){
        switch(status){
        case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
          console.log("Permission granted");
          break;
        case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
          console.log("Permission has not been requested yet");
          break;
        case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
          console.log("Permission denied - ask again?");
          break;
        case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
          console.log("Permission permanently denied - guess we won't be using it then!");
          break;
        }
      }, function(error){
        console.error("The following error occurred: "+error);
      }, type);

    }

  } ]);

'use strict';

var CordovaInit = function() {

	var onDeviceReady = function() {
		receivedEvent('deviceready');
	};

	var receivedEvent = function() {
		console.log('Start event received, bootstrapping application setup.');
		angular.bootstrap($('body'), ['reforguiApp']);
	};

	this.bindEvents = function() {
		document.addEventListener('deviceready', onDeviceReady, false);
	};

	//If cordova is present, wait for it to initialize, otherwise just try to
	//bootstrap the application.
	if (window.cordova !== undefined) {
		console.log('Cordova found, wating for device.');
		this.bindEvents();
	} else {
		console.log('Cordova not found, booting application');
		receivedEvent('manual');
	}
};

$(function() {
	console.log('Bootstrapping!');
	new CordovaInit();
});
'use strict';

/**
 * @ngdoc function
 * @name reforguiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reforguiApp
 */
angular.module('reforguiApp')
  .controller('MainCtrl', ["$scope", "$location", "$rootScope", "$localStorage", "Carousel", "getdataws", "smsReceiver", function ($scope, $location, $rootScope, $localStorage, Carousel, getdataws, smsReceiver) {

    /*
    $scope.toConfirm = [];
    $scope.toConfirm.push('NAZIONALE A2/F 4448 1:A.VIGATO 2:S.CANALI PFF GROUP FERRARA/MAGIKA CASTEL SAN PIETRO TERME 07/05/2016 21:00 PALA HILTON PHARMA P.le Atleti Azzurri d\'Italia 44124 FERRARA (FE)');
    $scope.toConfirm.push('CR LOMBARDIA C2 14139 1:N.MONGELLI 2:S.CANALI VIRTUS PALL. GORLE/ARDOR BOLLATE 25/05/2016 21:00 Palazzetto Via Roma 2 24020 GORLE (BG)');
    $scope.toConfirm.push('CP BERGAMO PROM.MASCH. 7139 1:L.CANALI 2:S.CANALI LA TORRE/BASKET CARAVAGGIO 23/05/2016 21:00 Palazzetto Via Milano 23 24020 TORRE BOLDONE (BG)');
    console.log('che array ho qua: ', $scope.toConfirm);
     */

    $scope.toConfirm = smsReceiver.list();

    $scope.confirmMatch = function () {
      console.log('chiama ufficio!');
    }

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

}]);

'use strict';

/**
 * @ngdoc function
 * @name reforguiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reforguiApp
 */
angular.module('reforguiApp')
    .controller('AboutCtrl', ["$scope", "$rootScope", "$timeout", "$window", "getdataws", function ($scope, $rootScope, $timeout, $window, getdataws) {

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

    }]);

'use strict';

/**
 * @ngdoc function
 * @name reforguiApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the reforguiApp
 */
angular.module('reforguiApp')
  .controller('RegisterCtrl', ["$scope", "$location", "$localStorage", "getdataws", function ($scope, $location, $localStorage, getdataws) {
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

  }]);

'use strict';

/**
 * @ngdoc service
 * @name reforguiApp.getdataws
 * @description
 * # getdataws
 * Factory in the reforguiApp.
 */
angular.module('reforguiApp')
  .factory('getdataws', ["$http", function ($http) {
    // Service logic
    // ...

    //var dev_path = "http://phabtest.divsi.unimi.it/reforg/";
    var devPath = 'http://www.elmariachistudios.it/reforg/';
    var meaningOfLife = 42;

    // Public API here
    return {
	    someMethod: function () {
        return meaningOfLife;
	    },

	    retrieveReferee: function(codref) {
        return $http.get(devPath+'referee?id='+codref);
	    },

	    createReferee: function(ref) {
        return $http.put(devPath+'referee/create', ref);
	    },

      updateReferee: function(ref) {
        return $http.post(devPath+'referee/update?address=true&contacts=true', ref);
      },

	    retrieveMatches: function(refName,refSurname,gmStartdate,gmEndDate) {
	      if (!gmStartdate) {
		      return $http.get(devPath+'match?name='+refName+'&surname='+refSurname);
	      } else {
		      return $http.get(devPath+'match/todos?name='+refName+'&surname='+refSurname+'&start='+gmStartdate+'&end='+gmEndDate);
	      }
	    },

	    updateMatch: function(match) {
	      return $http.put(devPath+'match/update', match);
	    }
    };
  }]);

'use strict';

/**
 * @ngdoc service
 * @name reforguiApp.smsReceiver
 * @description
 * # smsReceiver
 * Factory in the reforguiApp.
 */
angular.module('reforguiApp')
  .factory('smsReceiver', function () {
    // Service logic
    // ...

    var smsList = [];

    // Public API here
    return {
      list: function() {
        return smsList;
      },

      add: function (item) {
        smsList.push(item);
	    },

	    remove: function(index) {
        smsList.splice(index,1);
	    }
    };

  });

'use strict';

/**
 * @ngdoc function
 * @name reforguiApp.controller:MatchesCtrl
 * @description
 * # MatchesCtrl
 * Controller of the reforguiApp
 */
angular.module('reforguiApp')
    .controller('MatchesCtrl', ["$scope", "$rootScope", "$timeout", "$location", "$localStorage", "$filter", "$window", "getdataws", "utils", function ($scope, $rootScope, $timeout, $location, $localStorage, $filter, $window, getdataws, utils) {

	$scope.user;
	$scope.active = 1;

	$scope.init = function () {
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
    window.plugins.spinnerDialog.show();
	  getdataws.retrieveMatches($scope.user.name,$scope.user.surname)
		  .success(function (data) {
		    $scope.refMatches = data;

		    //console.log('lista delle partite', $scope.refMatches);
		    $timeout(function() {
			    window.plugins.spinnerDialog.hide();
		    }, 1000);
		  })
		  .error(function (data,status) {
		    alert('ci sono stati problemi con il server, riprovare più tardi');
		    window.plugins.spinnerDialog.hide();
		  });
	};

	$scope.showToday = function() {
    $window.scrollTo(0,0);
    $scope.active = 1;
	  $rootScope.active = $scope.active;
    window.plugins.spinnerDialog.show();
    var date = new Date();
	  date.setHours(0,0,0,0);
	  $scope.date = $filter('date')(date,'yyyy-MM-dd HH:mm');
	  getdataws.retrieveMatches($scope.user.name,$scope.user.surname,$scope.date)
		  .success(function (data) {
		    $scope.refMatches = data;

		    $timeout(function() {
			    window.plugins.spinnerDialog.hide();
		    }, 1000);
		  })
		  .error(function (data,status) {
		    alert('ci sono stati problemi con il server, riprovare più tardi');
		    window.plugins.spinnerDialog.hide();
		  });
	};

	$scope.showFuture = function() {
    $window.scrollTo(0,0);
    $scope.active = 2;
	  $rootScope.active = $scope.active;
    window.plugins.spinnerDialog.show();
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
			    window.plugins.spinnerDialog.hide();
		    }, 1000);
		  })
		  .error(function (data,status) {
		    alert('ci sono stati problemi con il server, riprovare più tardi');
		    window.plugins.spinnerDialog.hide();
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

}]);

'use strict';

/**
 * @ngdoc service
 * @name reforguiApp.utils
 * @description
 * # utils
 * Factory in the reforguiApp.
 */
angular.module('reforguiApp')
    .factory('utils', function () {
	// Service logic
	// ...

	var meaningOfLife = 42;

	// Public API here
	return {
	    someMethod: function () {
		return meaningOfLife;
	    },

	    getDate: function (data) {
		if (data != null && data) {
		    var dd = data.split('T');
		    var americandata = dd[0];
		    dd = americandata.split('-');
		    data = dd[2] + '/' + dd[1] + '/' + dd[0];
		}
		return data;
	    },

	    getTime: function(data) {
		if (data != null && data) {
		    var dd = data.split('T');
		    data = dd[1];
		}
		if (data != null) {
		    var dd2 = data.split(':');
		    data = dd2[0]+':'+dd2[1];
		}
		return data;
	    }
	};
    });

'use strict';

/**
 * @ngdoc function
 * @name reforguiApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the reforguiApp
 */
angular.module('reforguiApp')
  .controller('ProfileCtrl', ["$scope", "$location", "$localStorage", "getdataws", function ($scope, $location, $localStorage, getdataws) {

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
      window.plugins.spinnerDialog.show();
      getdataws.updateReferee($scope.editedUser)
        .success(function (data) {
          window.plugins.spinnerDialog.hide();
          $scope.user = angular.copy($scope.editedUser);
        })
        .error(function (data,status) {
          window.plugins.spinnerDialog.hide();
          alert('ci sono stati problemi con il server, riprovare più tardi');
        });
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
  }]);
