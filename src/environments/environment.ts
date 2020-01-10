// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// CUPRA
  // private latitude = 43.021818;
  // private longitude = 13.857440;
export const environment = {
  production: false,
  baseLat: 43.587155,
  baseLon: 13.528086,
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  appId: '1a9e7b4a6df2adfcc3b48aec42614c2e'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
