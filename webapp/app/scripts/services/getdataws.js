'use strict';

/**
 * @ngdoc service
 * @name reforguiApp.getdataws
 * @description
 * # getdataws
 * Factory in the reforguiApp.
 */
angular.module('reforguiApp')
  .factory('getdataws', function ($http) {
    // Service logic
    // ...

    //var dev_path = "http://phabtest.divsi.unimi.it/reforg/";
    var dev_path = "http://www.elmariachistudios.it/reforg/";
    var meaningOfLife = 42;

    // Public API here
    return {
	someMethod: function () {
            return meaningOfLife;
	},

	retrieveReferee: function(codref) {
            return $http.get(dev_path+"referee?id="+codref);
	},

	createReferee: function(ref) {
            return $http.put(dev_path+"referee/create", ref);
	},

	retrieveMatches: function(refName,refSurname,gmStartdate,gmEndDate) {
	    if (!gmStartdate) {
		return $http.get(dev_path+"match?name="+refName+"&surname="+refSurname);
	    } else {
		return $http.get(dev_path+"match/todos?name="+refName+"&surname="+refSurname+"&start="+gmStartdate+"&end="+gmEndDate);
	    }
	},

	updateMatch: function(match) {
	    return $http.put(dev_path+"match/update", match);
	}
    };
  });
