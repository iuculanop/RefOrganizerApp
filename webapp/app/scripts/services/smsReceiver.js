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
