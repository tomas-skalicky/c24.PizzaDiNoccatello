define(["module", "knockout", "window", "router", "knockout-amd-helpers", "text"], function (module, ko, window, router) {

  // Mapping path -> module:
  var routes = {
    ""                 : "home",
    "crazy/doughs"     : "crazy1",
    "crazy/ingredients": "crazy2",
    "menu"             : "menu",
    "checkout"         : "checkout",
    "*"                : "notfound" // fallback route!
  };

  function App() {
    if (!(this instanceof App)) {
      return new App();
    }

    this.currentModule = ko.observable();

    var self = this;
    router.addListener(function (path) {
      self.currentModule(routes[path.toLowerCase()] || routes["*"]);
    });

    router.startListening();
  }

  App.start = function () {
    ko.amdTemplateEngine.defaultPath = "../templates";
    ko.amdTemplateEngine.defaultSuffix = ".html";

    window.setTimeout(function() {
      ko.applyBindings(new App());
    }, 0);
  };

  return App;

});
