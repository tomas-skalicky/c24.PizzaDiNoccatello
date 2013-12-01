define(["knockout"], function (ko) {

  var Crazy2ViewModel;

  Crazy2ViewModel = function () {
    if (!(this instanceof Crazy2ViewModel)) {
        return new Crazy2ViewModel();
    }

    this.message = ko.observable("This message comes from Crazy2ViewModel.");
  };

  return Crazy2ViewModel;

});
