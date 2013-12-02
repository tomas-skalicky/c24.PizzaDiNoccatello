define(["knockout"], function (ko) {

  var MenuViewModel;

  MenuViewModel = function () {
    if (!(this instanceof MenuViewModel)) {
        return new MenuViewModel();
    }

    this.message = ko.observable("This message comes from MenuViewModel.");
  };

  return MenuViewModel;

});
