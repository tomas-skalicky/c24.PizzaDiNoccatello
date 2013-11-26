require.config({
  "config": {
    "*": {
      "version": (new Date()).toString()
    }
  },
  "baseUrl": "scripts/",
  "map": {
    "*": {
      "text": "../bower_components/text/text",
      "knockout": "../bower_components/knockout.js/knockout",
      "knockout-amd-helpers": "../bower_components/knockout-amd-helpers/build/knockout-amd-helpers"
    }
  },
  "urlArgs": "version=" +  (new Date()).getTime()
});

require(["module", "app", "knockout", "knockout-amd-helpers"], function(module, App, ko) {
  console.log("App started.");
  ko.amdTemplateEngine.defaultPath = "../templates";
  ko.amdTemplateEngine.defaultSuffix = ".html";

  window.setTimeout(function() {
    ko.applyBindings(new App());
  }, 0);
});
