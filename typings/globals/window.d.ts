/**
 * @description Adds the missing ngCordova definitions for the Window class,
 * thus enabling the app to build under Visual Studio. This is based on the
 * solution at:
 *
 * https://forum.ionicframework.com/t/ionic-2-with-ng-cordova/36103/24
 */
interface Window {
	/**
	 * @description Stub for the plugins variable.
	 */
	plugins: any;
}