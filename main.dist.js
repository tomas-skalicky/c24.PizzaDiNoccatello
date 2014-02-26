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
    "navigationService": "services/navigationService",
    "allaCartePage": "viewmodels/allaCartePage",
    "app": "viewmodels/app",
    "basketSection": "viewmodels/basketSection",
    "checkoutPage": "viewmodels/checkoutPage",
    "homePage": "viewmodels/homePage",
    "notfoundPage": "viewmodels/notfoundPage",
    "selectLayerPage": "viewmodels/selectLayerPage",
    "selectToppingsPage": "viewmodels/selectToppingsPage"
  },
  "urlArgs": "version=" +  (new Date()).getTime()
});
