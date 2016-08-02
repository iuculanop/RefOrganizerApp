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
  .config(function ($routeProvider) {
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
  })
  .run(["$rootScope", function($rootScope) {
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
      console.log('SMS received: '+ JSON.stringify(data,null,10));
      $rootScope.$apply(function() {
        console.log('SMS received: '+ JSON.stringify(data,null,10));
        $rootScope.smsList.push[data];
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
