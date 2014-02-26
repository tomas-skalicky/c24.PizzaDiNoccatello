define(["module", "knockout", "window", "navigationService", "knockout-amd-helpers", "text"], function (module, ko, window, navigationService) {

  ko.amdTemplateEngine.defaultPath = "../templates";
  ko.amdTemplateEngine.defaultSuffix = ".html";

  // Mapping path -> module:
  var routes = {
    ""                 : "homePage",
    "crazy/layers"     : "selectLayerPage",
    "crazy/ingredients": "selectToppingsPage",
    "allacarte"        : "allaCartePage",
    "checkout"         : "checkoutPage",
    "*"                : "notfoundPage" // fallback route!
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
