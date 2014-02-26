require.config({
  "config": {
    "*": {
      "version": (new Date()).getTime(),
      "environment": "production"
    }
  },
  "baseUrl": "dev/scripts/",
  "paths": {
    "text": "../bower_components/text/text",
    "knockout": "../bower_components/knockout.js/knockout",
    "knockout-amd-helpers": "../bower_components/knockout-amd-helpers/build/knockout-amd-helpers",
    "pajamas": "../bower_components/pajamas/src/pajamas",
    "q": "../bower_components/q/q",
    "dataService": "services/dataService",
    "navigationService": "services/navigationService"
  },
  "urlArgs": "version=" +  (new Date()).getTime()
});
