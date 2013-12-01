define(["module", "knockout", "router"], function (module, ko, router) {

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

  return App;

});
