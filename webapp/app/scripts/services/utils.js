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
