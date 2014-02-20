define(["knockout", "navigationService"], function (ko, navigationService) {

  var homeViewModel = {},
      availableOptions = {
        "Order à la carte": "#/menu",
        "Go crazy": "#/crazy/doughs"
      };

  homeViewModel.availableOptions = ko.observableArray(Object.keys(availableOptions));

  homeViewModel.currentOption = ko.observable(homeViewModel.availableOptions()[0]);

  homeViewModel.navigateToCurrentOption = function () {
    navigationService.navigateTo(availableOptions[homeViewModel.currentOption()]);
  };

  return homeViewModel;

});
