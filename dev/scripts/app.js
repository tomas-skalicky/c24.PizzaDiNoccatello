define(["module", "knockout", "window", "router", "knockout-amd-helpers", "text"], function (module, ko, window, router) {

  ko.amdTemplateEngine.defaultPath = "../templates";
  ko.amdTemplateEngine.defaultSuffix = ".html";

  // Mapping path -> module:
  var routes = {
    ""                 : "home",
    "crazy/doughs"     : "crazy1",
    "crazy/ingredients": "crazy2",
    "menu"             : "menu",
    "checkout"         : "checkout",
    "*"                : "notfound" // fallback route!
  };

  var app = {
    currentModule: ko.observable()
  };

  router.addListener(function (path) {
    app.currentModule(routes[path.toLowerCase()] || routes["*"]);
  });

  router.startListening();

  window.setTimeout(function () {
    ko.applyBindings(app);
  }, 0);

  return app;

});
