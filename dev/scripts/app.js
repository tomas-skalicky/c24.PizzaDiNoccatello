define(["module", "knockout", "window", "navigationService", "knockout-amd-helpers", "text"], function (module, ko, window, navigationService) {

  ko.amdTemplateEngine.defaultPath = "../templates";
  ko.amdTemplateEngine.defaultSuffix = ".html";

  // Mapping path -> module:
  var routes = {
    ""                 : "home",
    "crazy/layers"     : "goCrazySelectLayer",
    "crazy/ingredients": "crazy2",
    "menu"             : "menu",
    "checkout"         : "checkout",
    "*"                : "notfound" // fallback route!
  };

  var app = {
    currentModule: ko.observable()
  };

  navigationService.addListener(function (path) {
    app.currentModule(routes[path.toLowerCase()] || routes["*"]);
  });

  navigationService.startListening();

  window.setTimeout(function () {
    ko.applyBindings(app);
  }, 0);

  return app;

});
