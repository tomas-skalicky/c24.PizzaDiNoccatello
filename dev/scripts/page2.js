define(["knockout"], function (ko) {

  var Page2ViewModel;

  Page2ViewModel = function () {
    if (!(this instanceof Page2ViewModel)) {
        return new Page2ViewModel();
    }

    this.message = ko.observable("This message comes from Page2ViewModel..");
  };

  return Page2ViewModel;

});