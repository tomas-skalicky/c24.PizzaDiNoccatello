define(["knockout", "router"], function (ko, router) {

  var HomeViewModel,
      availableOptions = {
        "Order à la carte": "#/menu",
        "Go crazy": "#/crazy/doughs"
      };

  HomeViewModel = function () {
    if (!(this instanceof HomeViewModel)) {
      return new HomeViewModel();
    }

    this.availableOptions = ko.observableArray(Object.keys(availableOptions));

    this.currentOption = ko.observable(this.availableOptions()[0]);

    this.navigateToCurrentOption = (function () {
      router.navigateTo(availableOptions[this.currentOption()]);
    }).bind(this);
  };

  return HomeViewModel;

});
