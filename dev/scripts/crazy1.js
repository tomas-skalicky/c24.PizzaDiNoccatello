define(["knockout"], function (ko) {

  var Crazy1ViewModel;

  Crazy1ViewModel = function () {
    if (!(this instanceof Crazy1ViewModel)) {
        return new Crazy1ViewModel();
    }

    this.message = ko.observable("This message comes from Crazy1ViewModel.");
  };

  return Crazy1ViewModel;

});
