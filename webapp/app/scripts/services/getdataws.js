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
  });
