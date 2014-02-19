define(["knockout", "router"], function (ko, router) {

  var homeViewModel = {},
      availableOptions = {
        "Order à la carte": "#/menu",
        "Go crazy": "#/crazy/doughs"
      };

  homeViewModel.availableOptions = ko.observableArray(Object.keys(availableOptions));

  homeViewModel.currentOption = ko.observable(homeViewModel.availableOptions()[0]);

  homeViewModel.navigateToCurrentOption = function () {
    router.navigateTo(availableOptions[homeViewModel.currentOption()]);
  };

  return homeViewModel;

});
