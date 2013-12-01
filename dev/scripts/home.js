define(["knockout"], function (ko) {

  var HomeViewModel;

  HomeViewModel = function () {
    if (!(this instanceof HomeViewModel)) {
        return new HomeViewModel();
    }

    this.message = ko.observable("This message comes from HomeViewModel.");
  };

  return HomeViewModel;

});
