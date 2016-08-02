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
    },
    {
        "id": "cordova-plugin-sms.SMS",
        "file": "plugins/cordova-plugin-sms/www/SMS.js",
        "pluginId": "cordova-plugin-sms",
        "clobbers": [
            "window.SMS"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.Diagnostic",
        "file": "plugins/cordova.plugins.diagnostic/www/android/diagnostic.js",
        "pluginId": "cordova.plugins.diagnostic",
        "clobbers": [
            "cordova.plugins.diagnostic"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-device-orientation": "1.0.1",
    "cordova-plugin-splashscreen": "2.1.0",
    "hu.dpal.phonegap.plugins.SpinnerDialog": "1.3.1",
    "uk.co.workingedge.phonegap.plugin.LaunchNavigator": "2.9.0",
    "cordova-plugin-crosswalk-webview": "1.2.0",
    "cordova-plugin-sms": "1.0.5",
    "cordova.plugins.diagnostic": "3.1.1"
};
// BOTTOM OF METADATA
});