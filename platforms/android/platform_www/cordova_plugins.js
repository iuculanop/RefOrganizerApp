cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-device-orientation.CompassError",
        "file": "plugins/cordova-plugin-device-orientation/www/CompassError.js",
        "pluginId": "cordova-plugin-device-orientation",
        "clobbers": [
            "CompassError"
        ]
    },
    {
        "id": "cordova-plugin-device-orientation.CompassHeading",
        "file": "plugins/cordova-plugin-device-orientation/www/CompassHeading.js",
        "pluginId": "cordova-plugin-device-orientation",
        "clobbers": [
            "CompassHeading"
        ]
    },
    {
        "id": "cordova-plugin-device-orientation.compass",
        "file": "plugins/cordova-plugin-device-orientation/www/compass.js",
        "pluginId": "cordova-plugin-device-orientation",
        "clobbers": [
            "navigator.compass"
        ]
    },
    {
        "id": "com.cordova.plugins.sms.Sms",
        "file": "plugins/com.cordova.plugins.sms/www/sms.js",
        "pluginId": "com.cordova.plugins.sms",
        "clobbers": [
            "window.sms"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "hu.dpal.phonegap.plugins.SpinnerDialog.SpinnerDialog",
        "file": "plugins/hu.dpal.phonegap.plugins.SpinnerDialog/www/spinner.js",
        "pluginId": "hu.dpal.phonegap.plugins.SpinnerDialog",
        "merges": [
            "window.plugins.spinnerDialog"
        ]
    },
    {
        "id": "uk.co.workingedge.phonegap.plugin.LaunchNavigator.LaunchNavigator",
        "file": "plugins/uk.co.workingedge.phonegap.plugin.LaunchNavigator/www/android/launchnavigator.js",
        "pluginId": "uk.co.workingedge.phonegap.plugin.LaunchNavigator",
        "clobbers": [
            "launchnavigator"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-device-orientation": "1.0.1",
    "com.cordova.plugins.sms": "0.1.4",
    "cordova-plugin-splashscreen": "2.1.0",
    "hu.dpal.phonegap.plugins.SpinnerDialog": "1.3.1",
    "uk.co.workingedge.phonegap.plugin.LaunchNavigator": "2.9.0",
    "cordova-plugin-crosswalk-webview": "1.2.0"
};
// BOTTOM OF METADATA
});