define(["module", "knockout", "router"], function (module, ko, router) {

  // Mapping path -> module:
  var routes = {
    ""                 : "home",
    "crazy/dough"      : "crazy1",
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
      self.currentModule(routes[path.toLower()] || routes["*"]);
    });

    router.startListening();
  }

  return App;

});