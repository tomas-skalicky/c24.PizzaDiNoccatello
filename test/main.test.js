require.config({
  "config": {
    "*": {
      "version": (new Date()).getTime(),
      "environment": "test"
    }
  },
  "baseUrl": "dev/scripts/",
  "map": {
    "*": {
      "text": "../bower_components/text/text",
      "knockout": "../bower_components/knockout.js/knockout",
      "knockout-amd-helpers": "../bower_components/knockout-amd-helpers/build/knockout-amd-helpers"
    }
  },
  "urlArgs": "version=" +  (new Date()).getTime()
});
