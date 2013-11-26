define(["module", "knockout"], function(module, ko) {

  function App() {
    if (!(this instanceof App)) {
      return new App();
    }

    this.currentModule = ko.observable("page1");

    //this.navigate = (function () {
    //  this.currentModule("page2");
    //}).bind(this);
    //var that = this;
    //window.setTimeout(function () {
    //  that.navigate();
    //}, 2000);

    // Do application logic here!
  }

  return App;

});